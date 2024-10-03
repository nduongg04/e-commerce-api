import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ProductsModule } from './products/products.module';
import { DiscountsModule } from './discounts/discounts.module';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        PrismaModule,
        AuthModule,
        TokensModule,
        ProductsModule,
        DiscountsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
