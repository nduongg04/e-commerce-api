import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAccessGuard } from './auth/guards/jwt-access.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    // app.useGlobalGuards(new JwtAccessGuard());
    await app.listen(process.env.APP_PORT);
}
bootstrap();
