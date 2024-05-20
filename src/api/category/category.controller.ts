import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/create.dto';
import { CategoryUpdateDto } from './dto/update.dto';
import { CategoryDeleteDto } from './dto/delete.dto';

@Controller('category')
export default class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  async getById(@Param() params: any) {
    return await this.categoryService.getById(params.id);
  }

  @Post()
  addNew(@Body(new ValidationPipe()) categoryDto: CategoryCreateDto) {
    return this.categoryService.newCategory(categoryDto);
  }

  @Put()
  updateById(@Body(new ValidationPipe()) catDto: CategoryUpdateDto) {
    return this.categoryService.updateById(catDto);
  }

  @Delete(':id')
  deleteById(@Param(new ValidationPipe()) catDto: CategoryDeleteDto) {
    return this.categoryService.deleteById(catDto);
  }
}
