import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeDto } from '../dtos/employee.dto';
import { EmployeeService } from '../providers/employee.service';

describe('Employee Controller', () => {
    let controller: EmployeeController;
    let service: EmployeeService;
    const employeeDto: EmployeeDto = {
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
        },
        isActive: true,
        _id: 'a id',
    };

    const employeesArray = [
        {
            _id: '1',
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
            _id: '2',
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
            _id: '3',
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
        }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [
                {
                    provide: EmployeeService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(employeesArray),
                        create: jest.fn().mockResolvedValue(employeeDto),
                        softDelete: jest.fn().mockResolvedValue(employeesArray[0]),
                        update: jest.fn().mockResolvedValue({ ...employeeDto, name: "update" }),
                    },
                },
            ],
        }).compile();

        controller = module.get<EmployeeController>(EmployeeController);
        service = module.get<EmployeeService>(EmployeeService);
    });

    describe('create()', () => {
        it('should create a new employee', async () => {
            const createSpy = jest
                .spyOn(service, 'create')
                .mockResolvedValueOnce(mockEmployee);

            await controller.create(employeeDto);
            expect(createSpy).toHaveBeenCalledWith(employeeDto);
        });
    });

    describe('findAll()', () => {
        it('should return an array of employees', async () => {
            expect(controller.findAll({ skip: 0, limit: 0 })).resolves.toEqual(employeesArray);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('softDelete()', () => {
        it('should delete employee', async () => {
            expect(controller.softDelete('1')).resolves.toEqual(employeesArray[0]);
            expect(service.softDelete).toHaveBeenCalled();
        });
    });

    describe('update()', () => {
        it('should update employee', async () => {
            expect(controller.update('1', { ...employeeDto, name: "update" })).resolves.toEqual({ ...employeeDto, name: "update" });
            expect(service.update).toHaveBeenCalled();
        });
    });
});
