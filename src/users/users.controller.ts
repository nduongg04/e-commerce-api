import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from '../common/decorators';
import { UsersService } from './users.service';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnUserDto } from './dto/return-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':id')
	@ApiOkResponse({
		description: 'User fetched',
		type: ReturnUserDto,
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getProfile(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.getProfile(id);
	}

	@Get()
	@ApiOkResponse({
		description: 'Users fetched',
		type: ReturnUserDto,
		isArray: true,
	})
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiBearerAuth('access')
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
