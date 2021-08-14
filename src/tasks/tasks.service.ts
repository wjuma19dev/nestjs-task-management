import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taks-status.enum';
import { CreateTaskDto, GetTaskFilterDto } from './dtos';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private _tasksRepository: TasksRepository
    ) {}

    async findOneById(taskId: string): Promise<Task> {
        const found = await this._tasksRepository.findOne(taskId);
        if (!found) throw new NotFoundException(`the task with ID: ${taskId} not found`);
        return found;
    }

    create(createTask: CreateTaskDto): Promise<Task> {
        return this._tasksRepository.createOneTask(createTask);
    }

    async findOneAndDelete(taskId: string): Promise<DeleteResult> {
        const found = await this.findOneById(taskId);
        return await this._tasksRepository.delete(found.id);
    }

}
