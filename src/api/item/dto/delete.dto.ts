import { IsNotEmpty, IsString } from 'class-validator';

export class ItemDeleteDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
