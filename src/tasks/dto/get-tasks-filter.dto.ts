/* eslint-disable prettier/prettier */
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';
export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}