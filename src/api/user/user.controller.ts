import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserCreateDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async newUser(
    @Body(new ValidationPipe())
    userDto: UserCreateDto,
    @Req()
    req: Request,
  ) {
    userDto = req.body;

    return this.userService.newUser(userDto);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
