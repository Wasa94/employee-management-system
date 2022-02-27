
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as schema, Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ versionKey: false })
export class Employee {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    dateOfEmployment: Date;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({ type: schema.Types.Mixed, required: true })
    address: any;

    @Prop({ default: true })
    isActive: boolean;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
EmployeeSchema.path('address').validate(function (value) {
    if (!value) return false;
    if (typeof value === 'string') return true;
    if (typeof value !== 'object') return false;

    const properties = new Set(['city', 'zipCode', 'address1', 'address2']);
    const valueProperties = Object.keys(value);
    if (valueProperties.length === 4 && valueProperties.every(prop => properties.has(prop))) return true;

    properties.delete('address2');
    if (valueProperties.length === 3 && valueProperties.every(prop => properties.has(prop))) return true;

    return false;
}, 'Address not valid!');
