import {
    IsArray,
    IsEmail,
    IsNumber,
    IsNumberString,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @IsString()
    password: string;

    @IsNumberString()
    telephone: string;

    @IsArray()
    addresses: string[];
}
