import { IsNotEmpty,  IsString } from 'class-validator';

export class CategoryDeleteDto {
  @IsString()
  @IsNotEmpty()
  id: number;
}
