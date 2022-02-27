import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { EmployeeDto } from '../dtos/employee.dto';
import { EmployeeService } from '../providers/employee.service';
import { Employee } from '../schemas/employee.schema';

interface PaginationParams {
    skip: number;
    limit: number;
}

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    @ApiBody({ type: EmployeeDto })
    async create(@Body() employee: EmployeeDto) {
        return this.employeeService.create(employee);
    }

    @Get()
    @ApiQuery({ name: 'skip', type: Number })
    @ApiQuery({ name: 'limit', type: Number })
    async findAll(@Query() { skip, limit }: PaginationParams): Promise<Employee[]> {
        return this.employeeService.findAll(skip, limit);
    }

    @Put(':id')
    @ApiBody({ type: EmployeeDto })
    async update(@Param('id') id: string, @Body() employee: EmployeeDto): Promise<Employee> {
        return this.employeeService.update(id, employee);
    }

    @Delete(':id')
    async softDelete(@Param('id') id: string) {
        return this.employeeService.softDelete(id);
    }
}
