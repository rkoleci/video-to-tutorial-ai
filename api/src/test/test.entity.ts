import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Test {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    title: string;
  
    
  }