import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dtos";
import { TaskStatus } from "./taks-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {


    async createOneTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.save(task);
        return task;
    }
}