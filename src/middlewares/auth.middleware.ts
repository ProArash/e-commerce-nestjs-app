import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequireRole implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer ')) {
      return res.status(401).json({
        message: 'Invalid header.',
      });
    }
    console.log(1);
    
    next();
  }
}
