import { Body, Controller, Delete, Get, Patch, Post, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getCart(@Request() req) {
        return this.cartService.getCart(+req.user.userId);
    }

	@Post('add')
	async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
		return this.cartService.addToCart(req.user.userId,addToCartDto);
	}

	//modify product quantity in cart
	@Delete('remove')
	async removeFromCart(@Request() req, @Body() removeFromCartDto: RemoveFromCartDto) {
		return this.cartService.removeFromCart(req.user.userId, removeFromCartDto);
	}
	
}
