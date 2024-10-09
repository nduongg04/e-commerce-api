import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnOrderDto } from './dto/return-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@ApiCreatedResponse({
		description: 'Order created',
		type: ReturnOrderDto,
	})
	@ApiNotFoundResponse({ description: 'Some products not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
		return this.ordersService.createOrder(req.user.userId, createOrderDto);
	}
}
