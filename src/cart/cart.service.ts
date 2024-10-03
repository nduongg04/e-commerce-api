import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async getCart(userId: number) {
        return this.prisma.cart.findUnique({
            where: {
                userId,
            },
            include: {
                cartItems: true,
            },
        });
    }

    async addToCart(userId: number, addToCartDto: AddToCartDto) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: addToCartDto.productId,
            },
            include: {
                productInventory: true,
            },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.productInventory.quantity < addToCartDto.quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        await this.prisma.cart.upsert({
            where: {
                userId,
            },
            create: {
                userId,
                totalPrice: product.price * addToCartDto.quantity,
                cartItems: {
                    create: {
                        productId: product.id,
                        quantity: addToCartDto.quantity,
                    },
                },
            },
            update: {
                totalPrice: {
                    increment: product.price * addToCartDto.quantity,
                },
                cartItems: {
                    upsert: {
                        where: {
                            cartId_productId: {
                                cartId: (
                                    await this.prisma.cart.findUnique({
                                        where: {
                                            userId,
                                        },
                                        select: {
                                            id: true,
                                        },
                                    })
                                ).id,
                                productId: product.id,
                            },
                        },
                        create: {
                            productId: product.id,
                            quantity: addToCartDto.quantity,
                        },
                        update: {
                            quantity: { increment: addToCartDto.quantity },
                        },
                    },
                },
            },
        });

        return this.getCart(userId);
    }

    async removeFromCart(userId: number, removeFromCartDto: RemoveFromCartDto) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                userId,
            },
        });

        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: removeFromCartDto.productId,
                },
            },
            include: {
                product: true,
            },
        });

        if (cartItem.quantity < removeFromCartDto.quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        await this.prisma.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: removeFromCartDto.productId,
                },
            },
            data: {
                quantity: { decrement: removeFromCartDto.quantity },
                cart: {
                    update: {
                        totalPrice: {
                            decrement:
                                cartItem.product.price *
                                removeFromCartDto.quantity,
                        },
                    },
                },
            },
        });

        return this.getCart(userId);
    }
}
