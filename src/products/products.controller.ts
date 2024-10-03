import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ImportProductDto } from './dto/import-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Post('categories')
    async createProductCategory(
        @Body() createProductCategoryDto: CreateProductCategoryDto,
    ) {
        return this.productsService.createProductCategory(
            createProductCategoryDto,
        );
    }

    @Get('categories')
    async getProductCategories() {
        return this.productsService.getProductCategories();
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }

    @Patch('import/:productId')
    async importProduct(
        @Param('productId', ParseIntPipe) productId: number,
        @Body() importProductDto: ImportProductDto,
    ) {
        return this.productsService.importProduct(productId, importProductDto);
    }

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductById(id);
    }
}
