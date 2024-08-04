import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { authDto } from './dto/auth.dto';
import { Op } from 'sequelize';
import { User } from '../entities/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private jwtService: JwtService) { }

  async login(authDto: authDto, res): Promise<any> {
    try {

      console.log(authDto)
      if (!authDto.email || !authDto.password) {
        return res.json({
          status: false,
          message: 'Missing email or password',
        });
      }
      const user = await this.userService.findOne(authDto.email);
      if (!user) {
        return res.json({
          status: false,
          message: 'Email is not exists',
        });
      }
      const isPasswordValid = await bcrypt.compare(authDto.password, user.password);
      if (!isPasswordValid) {
        return res.json({
          status: false,
          message: 'Password is wrong',
        });
      }
      const payload = {
        id:user.id,
        name:user.name,
        email:user.email
      }

      const accessToken = await this.jwtService.signAsync({ payload });

      return res.json({
        status: true,
        message: 'Login successful',
        access_token: accessToken,
        user:payload
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
      });
    }
  }
}

