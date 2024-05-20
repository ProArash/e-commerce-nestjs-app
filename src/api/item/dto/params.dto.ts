import { IsNotEmpty, IsString } from 'class-validator';

export class ItemParamDto {
  @IsString()
  @IsNotEmpty()
  id: number;
}
