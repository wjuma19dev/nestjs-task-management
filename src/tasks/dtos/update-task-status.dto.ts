import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taks.model';

export class UpdateTaskStatusDto {

  @IsEnum(TaskStatus)
  status: TaskStatus;

}
