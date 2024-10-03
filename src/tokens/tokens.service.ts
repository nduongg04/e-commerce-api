import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService) {}
    async generateAccessToken({
        userId,
        userEmail,
    }: {
        userId: string;
        userEmail: string;
    }) {
        return {
            accessToken: await this.jwtService.signAsync(
                { userId, userEmail },
                {
                    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
                },
            ),
        };
    }

    async generateRefreshToken({
        userId,
        userEmail,
    }: {
        userId: string;
        userEmail: string;
    }) {
        return {
            refreshToken: await this.jwtService.signAsync(
                { userId, userEmail },
                {
                    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
                },
            ),
        };
    }

    async generatePairTokens({
        userId,
        userEmail,
    }: {
        userId: string;
        userEmail: string;
    }) {
        return {
            ...(await this.generateAccessToken({
                userId,
                userEmail,
            })),
            ...(await this.generateRefreshToken({
                userId,
                userEmail,
            })),
        };
    }
}
