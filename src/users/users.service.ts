import { saltOrRounds } from '@/src/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            saltOrRounds,
        );
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                fullName: createUserDto.fullName,
                password: hashedPassword,
                telephone: createUserDto.telephone,
                addresses: createUserDto.addresses,
            },
        });
    }

    async getProfile(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}
