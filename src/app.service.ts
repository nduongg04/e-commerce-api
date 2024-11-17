import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return `Hello World! Go to ${process.env.SWAGGER_URI} to see the API documentation`;
	}
}
