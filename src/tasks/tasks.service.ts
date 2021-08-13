import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './taks.model';
import { CreateTaskDto, GetTaskFilterDto } from './dtos';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  fetchAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: string): Task {
    const taskDB = this.tasks.find(task => task.id === taskId);
    if(!taskDB) throw new NotFoundException(`the task with ID: ${taskId} not found`);
    return taskDB;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const {status, search} = filterDto;
    let tasks = this.tasks;

    if(status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if(search) {
      tasks = tasks.filter(task => {
        if(task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  createTask(createTask: CreateTaskDto): Task {
    const { title, description } = createTask;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task;
  }

  updateTaks(taskId: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = taskStatus;
    return task;
  }

  deleteTask(taskId: string): Task[] {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if(taskIndex < 0) throw new NotFoundException(`the task with ID: ${taskId} not found`);
    return this.tasks.splice(taskIndex, 1);
  }

}
