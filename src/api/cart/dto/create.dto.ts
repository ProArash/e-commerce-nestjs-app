import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartAddDto {
  @IsNumber()
  @IsNotEmpty()
  item: number;

  @IsNumber()
  @IsNotEmpty()
  user: number;
}
