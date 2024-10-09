import { IsArray, IsNotEmpty } from 'class-validator';

export class ApplyDiscountDto {
	@IsArray({
		each: true,
	})
	@IsNotEmpty()
	productIds: number[];
}
