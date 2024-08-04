import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { BurritoService } from './burrito.service';
import { Burrito } from '../entities/burrito.entity';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
@ApiTags('Burrito')
export class BurritoController {
  constructor(private readonly burritoService: BurritoService) { }


  @ApiOperation({ summary: "To get all burritos data" })
  @ApiResponse({ status: 201, description: 'All burritos data....' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @Get('burrito')

  async getAllBruritos(@Req() req, @Res() res): Promise<Burrito[]> {
    console.log("Hello--------")
    return this.burritoService.findAll(req, res);
  }
}
