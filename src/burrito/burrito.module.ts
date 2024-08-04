import { Module } from '@nestjs/common';
import { BurritoService } from './burrito.service';
import { BurritoController } from './burrito.controller';

@Module({
  controllers: [BurritoController],
  providers: [BurritoService],
})
export class BurritoModule {}
