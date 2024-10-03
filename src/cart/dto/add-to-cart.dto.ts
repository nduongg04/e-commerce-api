import { IsNumber, IsPositive } from 'class-validator';

export class AddToCartDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
