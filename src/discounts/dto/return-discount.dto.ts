import { ReturnProductDto } from '@/src/products/dto/return-product.dto';

export class ReturnDiscountDto {
	description: string;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	deletedAt: Date | null;
	discountPercentage: number;
	active: boolean;
	products: ReturnProductDto[];
}
