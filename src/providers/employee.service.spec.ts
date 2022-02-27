import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../schemas/employee.schema';
import { Model } from 'mongoose';

const mockEmployee = {
    name: 'Employee 1',
    email: "employee1@gmail.com",
    phoneNumber: "011/123-456",
    dateOfEmployment: new Date(),
    dateOfBirth: new Date(),
    address: {
        city: "Test City",
        zipCode: "12345",
        address1: "address 1",
        address2: "address 2"
    }
};

describe('EmployeeService', () => {
    let service: EmployeeService;
    let model: Model<Employee>;

    const employeesArray = [
        {
            name: 'Employee 1',
            email: "employee1@gmail.com",
            phoneNumber: "011/123-456",
            dateOfEmployment: new Date(),
            dateOfBirth: new Date(),
            address: {
                city: "Test City",
                zipCode: "12345",
                address1: "address 1",
                address2: "address 2"
            },
            isActive: true
        },
        {
            name: 'Employee 2',
            email: "employee2@gmail.com",
            phoneNumber: "011/123-456",
            dateOfEmployment: new Date(),
            dateOfBirth: new Date(),
            address: {
                city: "Test City",
                zipCode: "12345",
                address1: "address 1",
                address2: "address 2"
            },
            isActive: true
        },
        {
            name: 'Employee 2',
            email: "employee2@gmail.com",
            phoneNumber: "011/123-456",
            dateOfEmployment: new Date(),
            dateOfBirth: new Date(),
            address: {
                city: "Test City",
                zipCode: "12345",
                address1: "address 1",
                address2: "address 2"
            },
            isActive: false
        }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeeService,
                {
                    provide: getModelToken('Employee'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockEmployee),
                        constructor: jest.fn().mockResolvedValue(mockEmployee),
                        find: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                        findByIdAndUpdate: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
        model = module.get<Model<Employee>>(getModelToken('Employee'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all employees', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValueOnce(employeesArray.filter(employee => employee.isActive))
                })
            })
        } as any);
        const employees = await service.findAll(0, 0);
        expect(employees).toEqual(employeesArray.filter(employee => employee.isActive));
    });

    it('should return all deleted employees', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(employeesArray.filter(employee => !employee.isActive)),
        } as any);
        const employees = await service.findAllDeleted();
        expect(employees).toEqual(employeesArray.filter(employee => !employee.isActive));
    });

    it('should insert a new employee', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve(mockEmployee),
        );
        const newEmployee = await service.create(mockEmployee);
        expect(newEmployee).toEqual(mockEmployee);
    });

    it('should update an employee', async () => {
        const updatedEmployee = {
            ...mockEmployee,
            name: 'updated name'
        };
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue(updatedEmployee as any);
        const employee = await service.update('1', updatedEmployee);
        expect(employee).toEqual(updatedEmployee);
    });

    it('should update soft delete an employee', async () => {
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue(mockEmployee as any);
        const employee = await service.softDelete('1');
        expect(employee).toEqual(mockEmployee);
    });
});
