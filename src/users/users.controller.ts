import { Controller, Get, Post, Request, Response, Body, UseInterceptors, UploadedFile, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @ApiSecurity('JWT-auth')
  @ApiOperation({ summary: "To Registered a user" })
  @ApiResponse({ status: 201, description: 'The user is registered successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Register a user',
    type: UserDto,
  })
  @Post("/register")
  async registerUser(@Res() res, @Body() UserDto: UserDto): Promise<any> {

    return this.userService.register(res,UserDto)

  }
}
