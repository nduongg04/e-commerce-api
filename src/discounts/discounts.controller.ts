import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { ApplyDiscountDto } from './dto/appy-discount.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ReturnDiscountProductDto } from './dto/return-discount-product.dto';
import { ReturnDiscountDto } from './dto/return-discount.dto';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
	constructor(private readonly discountsService: DiscountsService) {}

	@Post()
	@ApiCreatedResponse({
		description: 'Discount created',
		type: ReturnDiscountDto,
	})
	@ApiNotFoundResponse({ description: 'Some products not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
		return this.discountsService.createDiscount(createDiscountDto);
	}

	@Get()
	@ApiOkResponse({
		description: 'Discounts fetched',
		type: ReturnDiscountDto,
		isArray: true,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getAllDiscounts() {
		return this.discountsService.getAllDiscounts();
	}

	@Patch('/deactivate/:id')
	@ApiOkResponse({
		description: 'Discount deactivated',
		type: ReturnDiscountDto,
	})
	@ApiNotFoundResponse({ description: 'Discount not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBadRequestResponse({ description: 'Discount already deactivated' })
	@ApiBearerAuth('access')
	async deactivateDiscount(@Param('id', ParseIntPipe) id: number) {
		return this.discountsService.deactivateDiscount(id);
	}

	@Patch('/activate/:id')
	@ApiOkResponse({
		description: 'Discount activated',
		type: ReturnDiscountDto,
	})
	@ApiNotFoundResponse({ description: 'Discount not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBadRequestResponse({ description: 'Discount already activated' })
	@ApiBearerAuth('access')
	async activateDiscount(@Param('id', ParseIntPipe) id: number) {
		return this.discountsService.activateDiscount(id);
	}

	@Patch(':id/apply')
	@ApiOkResponse({
		description: 'Discount applied',
		type: ReturnDiscountProductDto,
	})
	@ApiNotFoundResponse({ description: 'Discount not found' })
	@ApiNotFoundResponse({ description: 'Some products not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async applyDiscount(
		@Param('id', ParseIntPipe) id: number,
		@Body() applyDiscountDto: ApplyDiscountDto,
	) {
		return this.discountsService.applyDiscount(id, applyDiscountDto);
	}

	@Get(':id')
	@ApiOkResponse({
		description: 'Discount fetched',
		type: ReturnDiscountDto,
	})
	@ApiNotFoundResponse({ description: 'Discount not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getDiscountById(@Param('id', ParseIntPipe) id: number) {
		return this.discountsService.getDiscountById(id);
	}
}
