import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyDiscountDto {
	@IsArray()
	@IsNumber({}, { each: true })
	@IsNotEmpty()
	productIds: number[];
}
