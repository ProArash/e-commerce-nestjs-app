import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CartAddDto } from './dto/create.dto';
import { CartService } from './cart.service';
import { Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':id')
  async getByUserId(@Param() params: any, @Res() res: Response) {
    const result = await this.cartService.getByUserId(params.id);
    if (!result) {
      return res.status(404).json({
        message: `Item ${params.id} not found.`,
      });
    }
    return res.status(200).json({
      message: result,
    });
  }

  @Post()
  async addItem(@Body(new ValidationPipe()) cartDto: CartAddDto) {
    return await this.cartService.addItem(cartDto);
  }
}
