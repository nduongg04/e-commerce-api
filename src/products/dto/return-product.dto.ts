export class ReturnProductDto {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	deletedAt: Date | null;
	price: number;
	categoryId: number;
	productInventoryId: number;
	discountId: number | null;
}
