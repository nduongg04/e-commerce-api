import { Product } from '@prisma/client';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    discountPercentage: number;

    @IsArray()
    @IsNumber({}, { each: true })
    productIds: number[];
}
