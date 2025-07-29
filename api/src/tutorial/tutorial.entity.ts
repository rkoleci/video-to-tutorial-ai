import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Tutorial {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    title: string;
  
    @Column({ type: 'text' })
    vid: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @Column({ type: 'text' })
    tutorial: string;
  }