import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../tokens/tokens.module';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
    imports: [UsersModule, PassportModule, TokensModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtAccessStrategy,
        {
            provide: 'APP_GUARD',
            useClass: JwtAccessGuard,
        },
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
