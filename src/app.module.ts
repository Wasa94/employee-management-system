import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeletedEmployeeController } from './controllers/deleted-employee.controller';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './providers/employee.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/EMS'),
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
  ],
  controllers: [DeletedEmployeeController, EmployeeController],
  providers: [EmployeeService],
})
export class AppModule { }
