import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { authDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "To login" })
  @ApiResponse({ status: 201, description: 'User Sucessfully logged In.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post("/login")
  async login(@Body() authDto: authDto, @Response() res): Promise<any> {
    return this.authService.login(authDto, res)
  }

}


