import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
