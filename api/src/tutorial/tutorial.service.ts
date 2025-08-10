import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { StatusEnum, Tutorial } from './tutorial.entity';

@Injectable()
export default class TutorialService {
  private readonly CACHE_KEY = 'tutorials'; // Redis hash key

  constructor(
    @InjectRepository(Tutorial)
    private tutorialRepository: Repository<Tutorial>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async findAll(): Promise<Tutorial[]> {
    try {
      const cachedTutorials = await this.redisClient.hgetall(this.CACHE_KEY);

      if (Object.keys(cachedTutorials).length > 0) {
        console.log('Serving tutorials from Redis cache');
        return Object.values(cachedTutorials).map((t) => JSON.parse(t));
      }

      console.log('Fetching tutorials from database');
      const tutorials = await this.tutorialRepository.find();

      const pipeline = this.redisClient.pipeline();
      tutorials.forEach((tutorial) => {
        pipeline.hset(this.CACHE_KEY, tutorial.id.toString(), JSON.stringify(tutorial));
      });
      await pipeline.exec();

      return tutorials;
    } catch (error) {
      console.error('Redis error, falling back to database:', error);
      return this.tutorialRepository.find();
    }
  }

  async findById(id: string): Promise<Tutorial | undefined> {
    try {
      const cachedTutorial = await this.redisClient.hget(this.CACHE_KEY, id);

      if (cachedTutorial) {
        console.log(`Serving tutorial ${id} from Redis cache`);
        return JSON.parse(cachedTutorial);
      }

      console.log(`Fetching tutorial ${id} from database`);
      const tutorial = await this.tutorialRepository.findOneOrFail({
        where: { id: Number(id) },
      });

      await this.redisClient.hset(this.CACHE_KEY, id, JSON.stringify(tutorial));

      return tutorial;
    } catch (error) {
      console.error('Redis error or DB miss:', error);
      return this.tutorialRepository.findOneOrFail({
        where: { id: Number(id) },
      });
    }
  }

  async create(tutorial: Partial<Tutorial>): Promise<Tutorial> {
    const newTutorial = this.tutorialRepository.create(tutorial);
    newTutorial.status = StatusEnum.PENDING;
    const savedTutorial = await this.tutorialRepository.save(newTutorial);

    try {
      await this.redisClient.hset(
        this.CACHE_KEY,
        savedTutorial.id.toString(),
        JSON.stringify(savedTutorial),
      );
    } catch (cacheError) {
      console.error('Failed to cache new tutorial:', cacheError);
    }

    return savedTutorial;
  }

  async update(id: string, partialTutorial: Partial<Tutorial>): Promise<Tutorial> {
    const tutorial = await this.tutorialRepository.findOneOrFail({
      where: { id: Number(id) },
    });

    const updatedTutorial = this.tutorialRepository.merge(tutorial, partialTutorial);
    const savedTutorial = await this.tutorialRepository.save(updatedTutorial);

    try {
      await this.redisClient.hset(
        this.CACHE_KEY,
        savedTutorial.id.toString(),
        JSON.stringify(savedTutorial),
      );
    } catch (cacheError) {
      console.error('Failed to update Redis cache after tutorial update:', cacheError);
    }

    return savedTutorial;
  }

  async updateStatus(id: string, status: StatusEnum): Promise<Tutorial> {
    const tutorial = await this.tutorialRepository.findOneOrFail({
      where: { id: Number(id) },
    });

    tutorial.status = status;
    const savedTutorial = await this.tutorialRepository.save(tutorial);

    try {
      await this.redisClient.hset(
        this.CACHE_KEY,
        savedTutorial.id.toString(),
        JSON.stringify(savedTutorial),
      );
    } catch (cacheError) {
      console.error('Failed to update Redis cache after status update:', cacheError);
    }

    return savedTutorial;
  }
}
