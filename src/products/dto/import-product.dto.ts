import { IsNumber } from "class-validator";

export class ImportProductDto {
    @IsNumber()
    quantity: number;
}
