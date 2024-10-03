import { Type } from 'class-transformer';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];

	@IsNotEmpty()
	@IsString()
	address: string;
}
