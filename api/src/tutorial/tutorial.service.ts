import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutorial } from './tutorial.entity';

@Injectable()
export default class TutorialService {
  constructor(
    @InjectRepository(Tutorial)
    private tutorialRepository: Repository<Tutorial>,
  ) {}

  async findAll(): Promise<Tutorial[]> {
    return this.tutorialRepository.find();
  }

  async create(tutorial: Partial<Tutorial>): Promise<Tutorial> {
    const newTutorial = this.tutorialRepository.create(tutorial);
    return this.tutorialRepository.save(newTutorial);
  }

  // Add other CRUD operations as needed
}