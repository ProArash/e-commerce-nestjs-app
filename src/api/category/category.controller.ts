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
import { Request } from 'express';
import { CategoryUpdateDto } from './dto/update.dto';
import { CategoryDeleteDto } from './dto/delete.dto';

@Controller('category')
export default class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getCategories();
  }

  @Post()
  addNew(
    @Body(new ValidationPipe()) categoryDto: CategoryCreateDto,
    req: Request,
  ) {
    categoryDto = req.body;
    return this.categoryService.newCategory(categoryDto);
  }

  @Put()
  updateById(
    @Body(new ValidationPipe()) catDto: CategoryUpdateDto,
    req: Request,
  ) {
    catDto = req.body;
    return this.categoryService.updateById(catDto);
  }

  @Delete(':id')
  deleteById(@Param(new ValidationPipe()) catDto: CategoryDeleteDto) {
    return this.categoryService.deleteById(catDto);
  }
}
