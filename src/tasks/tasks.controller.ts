import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './taks.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';

@Controller('tasks')
export class TasksController {

  constructor(private _tasksSvc: TasksService) {}

  @Get()
  fetchAllTasks(
    @Query('') filterDto: GetTaskFilterDto
  ): Task[] {

    // If we have any filter defined, call _tasksSvc.getTasksWithFilters
    // otherwise, just call this._tasksSvc.fetchAllTasks
    if (Object.keys(filterDto).length) {
      // ...
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
    @Body('status') taskStatus: TaskStatus
  ): Task {
    return this._tasksSvc.updateTaks(taskId, taskStatus);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this._tasksSvc.deleteTask(taskId);
  }

}
