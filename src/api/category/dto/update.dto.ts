import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CategoryUpdateDto{
    @IsString()
    @IsNotEmpty()
    title:string
    
    @IsNumber()
    @IsNotEmpty()
    id:number
}