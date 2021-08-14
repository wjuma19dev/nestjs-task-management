import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./taks-status.enum";

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status:  TaskStatus;
  
}
