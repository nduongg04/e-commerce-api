import { IsString } from "class-validator";

export class CreateProductCategoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}
