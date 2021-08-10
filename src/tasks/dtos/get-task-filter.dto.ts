import { TaskStatus } from '../taks.model';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
