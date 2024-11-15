import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('E-Commerce API')
		.setDescription('API for E-Commerce')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter Access Token',
				in: 'header',
			},
			'access',
		)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter Refresh Token',
				in: 'header',
			},
			'refresh',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(process.env.SWAGGER_URI, app, document, {
		swaggerOptions: {
			tagsSorter: 'alpha',
			operationsSorter: 'alpha',
			persistAuthorization: true,
		},
	});

	await app.listen(process.env.APP_PORT);
	console.log(`Server is running on port ${process.env.APP_PORT}`);
}
bootstrap();
