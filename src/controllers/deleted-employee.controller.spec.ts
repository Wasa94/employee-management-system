import { Test, TestingModule } from '@nestjs/testing';
import { DeletedEmployeeController } from './deleted-employee.controller';
import { EmployeeService } from '../providers/employee.service';

describe('Deleted Employee Controller', () => {
    let controller: DeletedEmployeeController;
    let service: EmployeeService;

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
            isActive: false
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
            isActive: false
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
            isActive: false
        }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DeletedEmployeeController],
            providers: [
                {
                    provide: EmployeeService,
                    useValue: {
                        findAllDeleted: jest.fn().mockResolvedValue(employeesArray)
                    },
                },
            ],
        }).compile();

        controller = module.get<DeletedEmployeeController>(DeletedEmployeeController);
        service = module.get<EmployeeService>(EmployeeService);
    });

    describe('findAllDeleted()', () => {
        it('should return an array of deleted employees', async () => {
            expect(controller.findAllDeleted()).resolves.toEqual(employeesArray);
            expect(service.findAllDeleted).toHaveBeenCalled();
        });
    });
});
