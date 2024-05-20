import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.model';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/create.dto';
import { CategoryUpdateDto } from './dto/update.dto';
import { CategoryDeleteDto } from './dto/delete.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  getById(id: any): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        items: true,
      },
    });
  }
  async newCategory(
    categoryDto: CategoryCreateDto,
  ): Promise<Category | object> {
    const category = await this.categoryRepository.findOne({
      where: {
        title: categoryDto.title,
      },
    });
    if (category) {
      return {
        message: `Category ${categoryDto.title} is duplicate.`,
      };
    }
    return this.categoryRepository.create(categoryDto).save();
  }

  async updateById(catDto: CategoryUpdateDto): Promise<Category | object> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: catDto.id,
      },
    });
    if (!category) {
      return {
        message: `Category with id ${catDto.id} not found.`,
      };
    }
    return this.categoryRepository.update(catDto.id, catDto);
  }

  async deleteById(catDto: CategoryDeleteDto): Promise<object> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: catDto.id,
      },
    });
    if (!category) {
      return {
        message: `Category '${catDto.id}' not found.`,
      };
    }
    await this.categoryRepository.delete(catDto.id);
    return {
      message: `Category ${catDto.id} deleted.`,
    };
  }
}
