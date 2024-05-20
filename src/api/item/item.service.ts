import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.model';
import { Repository } from 'typeorm';
import { ItemCreateDto } from './dto/create.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  getItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async newItem(itemDto: ItemCreateDto): Promise<Item | object> {
    const item = await this.itemRepository.findOne({
      where: {
        title: itemDto.title,
      },
    });
    if (item) {
      return {
        message: `Item '${itemDto.title}' is duplicate!`,
      };
    }
    return this.itemRepository.create(itemDto).save();
  }
}
