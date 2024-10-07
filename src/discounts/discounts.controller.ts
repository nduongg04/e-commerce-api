import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('discounts')
export class DiscountsController {
    constructor(private readonly discountsService: DiscountsService) {}

    @Post()
    async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
        return this.discountsService.createDiscount(createDiscountDto);
    }

    @Get()
    async getAllDiscounts() {
        return this.discountsService.getAllDiscounts();
    }

    @Patch('/deactivate/:id')
    async deactivateDiscount(@Param('id', ParseIntPipe) id: number) {
        return this.discountsService.deactivateDiscount(id);
    }

    @Patch('/activate/:id')
    async activateDiscount(@Param('id', ParseIntPipe) id: number) {
        return this.discountsService.activateDiscount(id);
    }

    @Get(':id')
    async getDiscountById(@Param('id', ParseIntPipe) id: number) {
        return this.discountsService.getDiscountById(id);
    }

	@Get()
}
