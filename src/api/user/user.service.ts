import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  newUser(userDto: UserCreateDto): Promise<User> {
    return this.userRepository
      .create({
        name: userDto.name,
        email: userDto.email,
      })
      .save();
  }
}
