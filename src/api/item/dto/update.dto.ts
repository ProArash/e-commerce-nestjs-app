import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: string;

  @IsBoolean()
  @IsNotEmpty()
  stock: boolean;
}
