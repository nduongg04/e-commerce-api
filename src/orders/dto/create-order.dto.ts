import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	@ApiProperty()
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
