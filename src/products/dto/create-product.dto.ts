import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
	@IsString()
	name: string;

	@IsPositive()
	price: number;

	@IsNumber()
	categoryId: number;
}
