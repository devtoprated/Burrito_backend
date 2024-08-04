import { Controller, Get, Post, Param, Body, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "Get ALl Orders" })
  @ApiResponse({ status: 201, description: 'Orders fetched successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  async getAllOrders(@Req() req, @Res() res): Promise<Order[]> {
    return this.orderService.getAllOrders(req,res);
  }

  @ApiOperation({ summary: "Get Indivisual order" })
  @ApiResponse({ status: 201, description: 'Fetched Indivisual order' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOneOrders(@Param('id') id: string,@Req() req,@Res() res): Promise<Order> {
    const order = await this.orderService.getOneOrders(id,req,res);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @ApiOperation({ summary: "Submit Order" })
  @ApiResponse({ status: 201, description: 'Order Submit successfuly' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto,@Req() req, @Res() res): Promise<Order> {
    return this.orderService.createOrder(createOrderDto, req,  res);
  }
}
