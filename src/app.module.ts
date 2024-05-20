import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { ItemModule } from './api/item/item.module';
import { RequireRole } from './middlewares/auth.middleware';
import { ItemController } from './api/item/item.controller';
import { ConfigModule } from '@nestjs/config';
import envConfig from './utils/env-config';
import { CategoryModule } from './api/category/category.module';

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
  ],
  exports: [TypeOrmModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequireRole)
      .exclude(
        { path: 'item', method: RequestMethod.GET },
        { path: 'item/(.*)', method: RequestMethod.GET }, // this will allow route to be acceesiable without auth header
      )
      .forRoutes(ItemController);
  }
}
