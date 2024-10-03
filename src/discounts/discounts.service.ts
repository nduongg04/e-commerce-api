import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllDiscounts() {
        return this.prisma.discount.findMany();
    }

    async getDiscountById(id: number) {
        const discount = await this.prisma.discount.findUnique({
            where: {
                id,
            },
        });

        if (!discount) {
            throw new NotFoundException('Discount not found');
        }

        return discount;
    }

    async createDiscount(createDiscountDto: CreateDiscountDto) {
        const productCount = await this.prisma.product.count({
            where: {
                id: {
                    in: createDiscountDto.productIds,
                },
            },
        });

        if (productCount !== createDiscountDto.productIds.length) {
            throw new NotFoundException('Some products not found');
        }

        return this.prisma.discount.create({
            data: {
                name: createDiscountDto.name,
                description: createDiscountDto.description,
                discountPercentage: createDiscountDto.discountPercentage,
                products: {
                    connect: createDiscountDto.productIds.map((id) => ({ id })),
                },
                active: true,
            },
        });
    }

    async deactivateDiscount(id: number) {
        const discount = await this.prisma.discount.findUnique({
            where: {
                id,
            },
        });

        if (!discount) {
            throw new NotFoundException('Discount not found');
        }

        if (!discount.active) {
            throw new BadRequestException('Discount already deactivated');
        }

        return this.prisma.discount.update({
            where: {
                id,
            },
            data: {
                active: false,
            },
        });
    }

    async activateDiscount(id: number) {
        const discount = await this.prisma.discount.findUnique({
            where: {
                id,
            },
        });

        if (!discount) {
            throw new NotFoundException('Discount not found');
        }

        if (discount.active) {
            throw new BadRequestException('Discount already active');
        }

        return this.prisma.discount.update({
            where: {
                id,
            },
            data: {
                active: true,
            },
        });
    }
}
