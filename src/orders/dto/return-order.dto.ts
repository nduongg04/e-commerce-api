import { Order } from '@prisma/client';

export class ReturnOrderDto {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
	totalPrice: number;
	orderAddress: string;
}