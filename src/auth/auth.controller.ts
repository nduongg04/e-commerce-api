import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConflictResponse,
	ApiHeader,
	ApiHeaders,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../common/decorators';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/return-login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalGuard } from './guards/local.guard';
import { ReturnUserDto } from '../users/dto/return-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	@ApiConflictResponse({ description: 'User already exists' })
	@ApiOkResponse({ description: 'User created', type: ReturnUserDto })
	async register(@Body() createUserDto: CreateUserDto) {
		return await this.authService.register(createUserDto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalGuard)
	@ApiBody({
		schema: {
			properties: {
				email: {
					type: 'string',
				},
				password: {
					type: 'string',
				},
			},
		},
	})
	@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
	@ApiOkResponse({ description: 'User logged in', type: ReturnLoginDto })
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@Public()
	@UseGuards(JwtRefreshGuard)
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiOkResponse({
		description: 'Refresh token',
		schema: {
			properties: {
				accessToken: {
					type: 'string',
				},
			},
		},
	})
	@ApiBearerAuth('refresh')
	async refresh(@Request() req) {
		return this.authService.refresh(req.user);
	}
}
