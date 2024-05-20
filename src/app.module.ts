import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { ItemModule } from './api/item/item.module';
import { AuthGuard } from './middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import envConfig from './utils/env-config';
import { CategoryModule } from './api/category/category.module';
import { AuthModule } from './api/auth/auth.module';
import { UserRole } from './utils/role-enum';
import { roleGuard } from './middlewares/role.middleware';
import { ItemController } from './api/item/item.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'magicape',
      database: 'e_commerce',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    ItemModule,
    CategoryModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuard, roleGuard(UserRole.USER))
      .exclude(
        { path: 'item', method: RequestMethod.GET },
        { path: 'item/(.*)', method: RequestMethod.GET }, // this will allow route to be acceesiable without auth header
      )
      .forRoutes(ItemController);
  }
}
