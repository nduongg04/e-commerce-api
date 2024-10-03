import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { CreateUserDto } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokensService: TokensService,
    ) {}
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password: _, ...result } = user;
        return result;
    }

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findUserByEmail(
            createUserDto.email,
        );
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const newUser = await this.usersService.createUser(createUserDto);
        const { password: _, ...result } = newUser;
        return {
            ...(await this.tokensService.generatePairTokens({
                userId: newUser.id.toString(),
                userEmail: newUser.email,
            })),
            user: result,
        };
    }

    async login(user: any) {
        return {
            ...(await this.tokensService.generatePairTokens({
                userId: user.id,
                userEmail: user.email,
            })),
            user,
        };
    }

    async refresh(user: any) {
        return {
            ...(await this.tokensService.generateAccessToken({
                userId: user.userId,
                userEmail: user.userEmail,
            })),
        };
    }
}
