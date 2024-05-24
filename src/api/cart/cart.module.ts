import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  exports: [TypeOrmModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
