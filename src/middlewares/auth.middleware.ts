import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { IAuthPayload } from '../api/auth/auth.payload';

@Injectable()
export class AuthGuard implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer ')) {
      return res.status(401).json({
        message: 'Invalid header.',
      });
    }
    const token = authHeader.split(' ')[1];
    try {
      const result = (await this.jwtService.verifyAsync(token)) as IAuthPayload;
      //@ts-ignore
      req.user = result;
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }

    next();
  }
}
