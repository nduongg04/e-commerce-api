import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
        return this.ordersService.createOrder(req.user.userId, createOrderDto);
    }
}
