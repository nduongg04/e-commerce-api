import { CartItem } from '@prisma/client';

export class ReturnCartItemDto {
	id: number;
    createdAt: Date;
    updatedAt: Date;
    cartId: number;
    productId: number;
    quantity: number;
}

export class ReturnCartDto {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	totalPrice: number;
	userId: number;
	cartItems: ReturnCartItemDto[];
}
