/* eslint-disable prettier/prettier */
import { Task } from 'src/tasks/dto/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true}) //unique handle double data
  email: string;
  
  @Column()
  password: string;

  @OneToMany(_type => Task, task => task.user, { eager: true})
  tasks: Task[] //one user have many task
}
