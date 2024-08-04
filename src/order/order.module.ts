import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BurritoModule } from 'src/burrito/burrito.module';

@Module({
  imports:[BurritoModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
