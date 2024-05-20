import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));
  await app.listen(3000, () => {
    console.log(`server is running on port 3000`);
  });
}
bootstrap();
