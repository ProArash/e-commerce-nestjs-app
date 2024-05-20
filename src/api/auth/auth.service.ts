import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.model';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import envConfig from '../../utils/env-config';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from './auth.payload';
import { IServiceResult } from '../../utils/service-result';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto,@Req() req?:Request): Promise<IServiceResult> {
    let user = await this.userRepository.findOne({
      where: {
        email: signUpDto.email,
      },
    });
    if (user) {
      return {
        message: `Email ${signUpDto.email} is duplicate.`,
        status: false,
      };
    }
    signUpDto.password = await bcrypt.hash(
      signUpDto.password,
      Number(envConfig().hash_salt),
    );
    user = await this.userRepository.create(signUpDto).save()
    const payload: IAuthPayload = {
      id: user.id,
      email: user.email,
    };
    //@ts-ignore
    req.user = payload
    return {
      message: await this.jwtService.signAsync(payload),
      status: true,
    };
  }

  async signIn(loginDto: SignInDto): Promise<IServiceResult> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      return {
        message: `Email ${loginDto.email} not found.`,
        status: false,
      };
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      return {
        message: 'Invalid password.',
        status: false,
      };
    }
    const payload: IAuthPayload = {
      id: user.id,
      email: user.email,
    };
    return {
      message: await this.jwtService.signAsync(payload),
      status: true,
    };
  }
}
