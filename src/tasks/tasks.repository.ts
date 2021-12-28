/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { TaskStatus } from './tasks-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto, user : User):Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task'); //create query
        query.where({user})
        
        if(status){
            query.andWhere(`task.status = :status`, {status})
            // task.status equal anything in column status {status mean value of status that u want search}
        }
        if(search){
            query.andWhere(
                `(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))`,
                {search : `%${search}%`},
            )
        }
        const tasks = await query.getMany(); //getmany query
        return tasks
    }
    async createTask(createTaskDto: CreateTaskDto , user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });
        await this.save(task);
        return task;
    }
}
