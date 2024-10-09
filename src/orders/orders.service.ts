import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly prismaService: PrismaService) {}
    async createOrder(userId: number, createOrderDto: CreateOrderDto) {
        const products = await this.prismaService.product.findMany({
            where: {
                id: {
                    in: createOrderDto.orderItems.map((item) => item.productId),
                },
            },
            include: {
                productInventory: true,
            },
        });
        if (products.length !== createOrderDto.orderItems.length) {
            throw new NotFoundException('Some products not found');
        }
        let totalPrice = 0;
        products.forEach((product) => {
            const orderItem = createOrderDto.orderItems.find(
                (item) => item.productId === product.id,
            );
            if (orderItem.quantity > product.productInventory.quantity) {
                throw new BadRequestException(
                    `Product ${product.name} not enough quantity`,
                );
            }
            totalPrice += product.price * orderItem.quantity;
        });
        createOrderDto.orderItems.forEach(async (item) => {
            await this.prismaService.product.update({
                where: {
                    id: item.productId,
                },
                data: {
                    productInventory: {
                        update: {
                            quantity: {
                                decrement: item.quantity,
                            },
                        },
                    },
                },
            });
        });
        return this.prismaService.order.create({
            data: {
                totalPrice,
                orderAddress: createOrderDto.address,
                userId,
                orderItems: {
                    createMany: {
                        data: createOrderDto.orderItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
            },
        });
    }
}
