import { ApiExtraModels, ApiProperty, ApiPropertyOptional, getSchemaPath } from "@nestjs/swagger";

export class EmployeeAddressDto {
    @ApiProperty()
    readonly city: string;

    @ApiProperty()
    readonly zipCode: string;

    @ApiProperty()
    readonly address1: string;

    @ApiPropertyOptional()
    readonly address2?: string;
}

@ApiExtraModels(EmployeeAddressDto)
export class EmployeeDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly dateOfEmployment: Date;

    @ApiProperty()
    readonly dateOfBirth: Date;

    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(EmployeeAddressDto) },
            { type: 'string' }
        ]
    })
    readonly address: EmployeeAddressDto | string;
}
