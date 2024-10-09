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
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnProductDto } from './dto/return-product.dto';
import { ReturnProductCategoryDto } from './dto/return-product-category.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	@ApiOkResponse({
		description: 'Products fetched',
		type: ReturnProductDto,
		isArray: true,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getAllProducts() {
		return this.productsService.getAllProducts();
	}

	@Post('categories')
	@ApiCreatedResponse({
		description: 'Product category created',
		type: ReturnProductCategoryDto,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async createProductCategory(
		@Body() createProductCategoryDto: CreateProductCategoryDto,
	) {
		return this.productsService.createProductCategory(
			createProductCategoryDto,
		);
	}

	@Get('categories')
	@ApiOkResponse({
		description: 'Product categories fetched',
		type: ReturnProductCategoryDto,
		isArray: true,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getProductCategories() {
		return this.productsService.getProductCategories();
	}

	@Post()
	@ApiCreatedResponse({
		description: 'Product created',
		type: ReturnProductDto,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async createProduct(@Body() createProductDto: CreateProductDto) {
		return this.productsService.createProduct(createProductDto);
	}

	@Patch('import/:productId')
	@ApiOkResponse({
		description: 'Product imported',
		type: ReturnProductDto,
	})
	@ApiNotFoundResponse({ description: 'Product not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async importProduct(
		@Param('productId', ParseIntPipe) productId: number,
		@Body() importProductDto: ImportProductDto,
	) {
		return this.productsService.importProduct(productId, importProductDto);
	}

	@Get(':id')
	@ApiOkResponse({
		description: 'Product fetched',
		type: ReturnProductDto,
	})
	@ApiNotFoundResponse({ description: 'Product not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getProductById(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.getProductById(id);
	}
}
