import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus } from './taks-status.enum';

import {
  CreateTaskDto,
  GetTaskFilterDto,
  UpdateTaskStatusDto
} from './dtos';

@Controller('tasks')
export class TasksController {

  constructor(private _tasksSvc: TasksService) {}

  @Get(':taskId')
  findOneById(@Param('taskId') taskId: string) {
    return this._tasksSvc.findOneById(taskId);
  }

  @Post()
  create(@Body() createTask: CreateTaskDto) {
    return this._tasksSvc.create(createTask);
  }

  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    return this._tasksSvc.findOneAndDelete(taskId);
  }

}
