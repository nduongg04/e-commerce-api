import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ImportProductDto } from './dto/import-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProducts() {
        return this.prisma.product.findMany({
            include: {
                productInventory: true,
            },
        });
    }

    async createProduct(createProductDto: CreateProductDto) {
        const existingProductCategory =
            await this.prisma.productCategory.findUnique({
                where: {
                    id: createProductDto.categoryId,
                },
            });

        if (!existingProductCategory) {
            throw new NotFoundException('Product category not found');
        }

        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name: createProductDto.name,
                    price: createProductDto.price,
                    category: {
                        connect: {
                            id: existingProductCategory.id,
                        },
                    },
                    productInventory: {
                        create: {
                            quantity: 0,
                        },
                    },
                },
                include: {
                    productInventory: true,
                },
            });

            return product;
        });
    }

    async getProductById(id: number) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                productInventory: true,
            },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async createProductCategory(
        createProductCategoryDto: CreateProductCategoryDto,
    ) {
        return this.prisma.productCategory.create({
            data: createProductCategoryDto,
        });
    }

    async getProductCategories() {
        return this.prisma.productCategory.findMany();
    }

    async importProduct(productId: number, importProductDto: ImportProductDto) {
        const productInventory = await this.prisma.productInventory.findUnique({
            where: {
                productId,
            },
        });

        if (!productInventory) {
            throw new NotFoundException('Product inventory not found');
        }

        return this.prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                productInventory: {
                    update: {
                        quantity:
                            importProductDto.quantity +
                            productInventory.quantity,
                    },
                },
            },
            include: {
                productInventory: true,
            },
        });
    }
}
