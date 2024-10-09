import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { ReturnCartDto } from './dto/return-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	@ApiOkResponse({
		description: 'Cart retrieved',
		type: ReturnCartDto,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getCart(@Request() req) {
		return this.cartService.getCart(+req.user.userId);
	}

	@Post('add')
	@ApiCreatedResponse({
		description: 'Product added to cart',
		type: ReturnCartDto,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
		return this.cartService.addToCart(req.user.userId, addToCartDto);
	}

	//modify product quantity in cart
	@Delete('remove')
	@ApiOkResponse({
		description: 'Product removed from cart',
		type: ReturnCartDto,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async removeFromCart(
		@Request() req,
		@Body() removeFromCartDto: RemoveFromCartDto,
	) {
		return this.cartService.removeFromCart(
			req.user.userId,
			removeFromCartDto,
		);
	}
}
