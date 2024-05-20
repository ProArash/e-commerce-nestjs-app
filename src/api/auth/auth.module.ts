import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import envConfig from '../../utils/env-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: envConfig().jwt_secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
