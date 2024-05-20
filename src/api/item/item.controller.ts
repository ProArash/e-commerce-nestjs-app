import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemCreateDto } from './dto/create.dto';
import { Response } from 'express';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  async getItems() {
    return await this.itemService.getItems();
  }

  @Get(':id')
  async getItemById(@Param() params: any, @Res() res: Response) {
    const item = await this.itemService.getById(params.id);
    if (!item) {
      return res.status(404).json({
        message: `Item ${params.id} not found.`,
      });
    }
    return res.status(200).json({
      item
    });
  }

  @Post()
  async newItem(@Body(new ValidationPipe()) itemDto: ItemCreateDto) {
    return await this.itemService.newItem(itemDto);
  }
}
