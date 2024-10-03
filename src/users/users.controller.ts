import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from '../common/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('profile/:id')
    async getProfile(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getProfile(id);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
