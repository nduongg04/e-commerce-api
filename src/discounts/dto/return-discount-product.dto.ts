import { ReturnProductDto } from '../../products/dto/return-product.dto';

export class ReturnDiscountProductDto extends ReturnProductDto {
	products: ReturnProductDto[];
}
