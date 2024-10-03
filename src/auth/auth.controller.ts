import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { Public } from '../common/decorators';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @Public()
    @UseGuards(JwtRefreshGuard)
    async refresh(@Request() req) {
        return this.authService.refresh(req.user);
    }
}
