import { Injectable, Inject, Response, Request } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

    async register(res, userDto: UserDto): Promise<any> {
        try {
            if (!userDto.name || !userDto.email || !userDto.password) {
                return res.status(400).json({
                    status: false,
                    message: 'Missing required fields',
                });
            }
            const existingUser = await this.findOne(userDto.email);
            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    message: 'User with this email already exists',
                });
            }
            const hashedPassword = await bcrypt.hash(userDto.password, 10);
            const user = await User.create({
                name: userDto.name,
                email: userDto.email,
                password: hashedPassword,
            });
            return res.json({
                status: true,
                message: 'User registered successfully',
                result: user,
            });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({
                status: false,
                message: 'Failed to register user',
            });
        }
    }

    async findOne(email: string): Promise<any> {
        return await User.findOne({ where: { email: email } })
    }

}  