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
import { Task } from './taks.model';

import {
  CreateTaskDto,
  GetTaskFilterDto,
  UpdateTaskStatusDto
} from './dtos';

@Controller('tasks')
export class TasksController {

  constructor(private _tasksSvc: TasksService) {}

  @Get()
  fetchAllTasks(
    @Query() filterDto: GetTaskFilterDto
  ): Task[] {

    if (Object.keys(filterDto).length) {
      return this._tasksSvc.getTasksWithFilters(filterDto);
    } else {
      return this._tasksSvc.fetchAllTasks();
    }

  }

  @Get(':taskId')
  getTaskById(@Param('taskId') taskId: string): Task {
    return this._tasksSvc.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTask: CreateTaskDto): Task {
    return this._tasksSvc.createTask(createTask);
  }

  @Put(':taskId/:taskStatus')
  updateTaks(
    @Param('taskId') taskId: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto
  ): Task {
    const { status } = updateTaskStatus;
    return this._tasksSvc.updateTaks(taskId, status);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this._tasksSvc.deleteTask(taskId);
  }

}
