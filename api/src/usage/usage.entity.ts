import { Tutorial } from 'src/tutorial/tutorial.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('usage')
export class Usage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ip: string;

  @Column()
  hits: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
