import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ImportProductDto {
    @IsNumber()
    quantity: number;
}
