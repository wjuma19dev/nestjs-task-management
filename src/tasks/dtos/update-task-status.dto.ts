import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taks-status.enum';

export class UpdateTaskStatusDto {

  @IsEnum(TaskStatus)
  status: TaskStatus;

}
