import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../providers/employee.service';
import { Employee } from '../schemas/employee.schema';

@Controller('deleted-employees')
export class DeletedEmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get()
    async findAllDeleted(): Promise<Employee[]> {
        return this.employeeService.findAllDeleted();
    }
}
