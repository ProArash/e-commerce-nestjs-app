import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Request } from 'express';
import { ItemCreateDto } from './dto/create.dto';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  async getItems() {
    return await this.itemService.getItems();
  }

  @Get(':id')
  async getItemById(@Param() params: any) {
    const { id } = params;
    return {
      message: id,
    };
  }

  @Post()
  async newItem(
    @Body(new ValidationPipe()) itemDto: ItemCreateDto,
    @Req() req: Request,
  ) {
    itemDto = req.body;
    console.log(itemDto);

    return await this.itemService.newItem(itemDto);
  }
}
