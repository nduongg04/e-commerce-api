import { ReturnUserDto } from '@/src/users/dto/return-user.dto';

export class ReturnLoginDto {
	accessToken: string;
	refreshToken: string;
	user: ReturnUserDto;
}
