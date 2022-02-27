import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../schemas/employee.schema';
import { Model } from "mongoose";
import { EmployeeDto } from "src/dtos/employee.dto";

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) { }

    async create(employee: EmployeeDto): Promise<Employee> {
        const newEmployee = await this.employeeModel.create(employee);
        return newEmployee;
    }

    async findAll(skip: number, limit: number): Promise<Employee[]> {
        const query = this.employeeModel
            .find({ 'isActive': true })
            .sort({ _id: 1 })
            .skip(skip);
        if (limit) {
            query.limit(limit);
        }
        return query.exec();
    }

    async findAllDeleted(): Promise<Employee[]> {
        return this.employeeModel.find({ 'isActive': false }).exec();
    }

    async update(id: string, employee: EmployeeDto): Promise<Employee> {
        return await this.employeeModel.findByIdAndUpdate(id, employee, { new: true })
    }

    async softDelete(id: string): Promise<Employee> {
        return await this.employeeModel.findByIdAndUpdate(id, { 'isActive': false }, { new: true });
    }
}
