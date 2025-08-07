import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { Tutorial } from './tutorial.entity';

@Injectable()
export default class TutorialService {

  private readonly CACHE_KEY = 'tutorials:all';
  private readonly CACHE_TTL = 3600; 

  constructor(
    @InjectRepository(Tutorial)
    private tutorialRepository: Repository<Tutorial>,
     @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async findAll(): Promise<Tutorial[]> {
     try {
      const cachedTutorials = await this.redisClient.get(this.CACHE_KEY);
      
      if (cachedTutorials) {
        console.log('Serving tutorials from Redis cache');
        return JSON.parse(cachedTutorials);
      }

      // If not in cache, get from database
      console.log('Fetching tutorials from database');
      const tutorials = await this.tutorialRepository.find();
      
      // Store in Redis cache for future requests
      await this.redisClient.setex(
        this.CACHE_KEY, 
        this.CACHE_TTL, 
        JSON.stringify(tutorials)
      );

      return tutorials;
    } catch (error) {
      console.error('Redis error, falling back to database:', error);
      return this.tutorialRepository.find();
    }
  }

  async findById(id: string): Promise<Tutorial | undefined> {  // check flow
     try {
      const cachedTutorials = await this.redisClient.get(this.CACHE_KEY);
      
      if (cachedTutorials) {
        console.log('Serving tutorials from Redis cache');
        return JSON.parse(cachedTutorials)?.find(t => t.id == id);
      }

      // If not in cache, get from database
      console.log('Fetching tutorials from database');
      const tutorial = await this.tutorialRepository.findOneOrFail({
        where: { id: Number(id) }
      });
      
      // Store in Redis cache for future requests
      if (tutorial) {
        await this.redisClient.setex(
        this.CACHE_KEY, 
        this.CACHE_TTL, 
        JSON.stringify([...cachedTutorials || [], tutorial]) // check ths
      );
      }

      return tutorial;
    } catch (error) {
      console.error('Redis error, falling back to database:', error);
       const tutorials = await this.tutorialRepository.findOneOrFail({
        where: { id: Number(id) }
      });

      return tutorials
    }
  }

  async create(tutorial: Partial<Tutorial>): Promise<Tutorial> {
    const newTutorial = this.tutorialRepository.create(tutorial);
    return this.tutorialRepository.save(newTutorial);
  }

  // Add other CRUD operations as needed
}