import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.model';
import { Repository } from 'typeorm';
import { ItemCreateDto } from './dto/create.dto';
import { User } from '../user/user.model';
import { Category } from '../category/category.model';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  getItems(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: {
        user: true,
        category: true,
      },
    });
  }
  getById(id: any): Promise<Item> {
    return this.itemRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        category: true,
      },
    });
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
    const user = await User.findOne({
      where: {
        id: itemDto.userId,
      },
    });
    const category = await Category.findOne({
      where: {
        id: itemDto.categoryId,
      },
    });
    return this.itemRepository
      .create({
        user,
        category,
        ...itemDto,
      })
      .save();
  }
}
