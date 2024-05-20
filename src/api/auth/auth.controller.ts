import { Body, Controller, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe()) registerDto: SignUpDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.authService.signUp(registerDto);
    if (!result.status) {
      return res.status(400).json({
        message: result.message,
        status: result.status,
      });
    }
    res.status(200).json({
      message: result.message,
      status: result.status,
      //@ts-ignore
      data:req.user
    });
  }
  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: SignInDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.authService.signIn(loginDto);
    if (!result.status) {
      return res.status(403).json({
        message: result.message,
        status: result.status,
      });
    }
    res.status(200).json({
      message: result.message,
      status: result.status,
      //@ts-ignore
      data:req.user
    });
  }
}
