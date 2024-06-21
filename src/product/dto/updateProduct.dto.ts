import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The price of the product.',
    example: 29.99,
    type: Number,
    required: false,
  })
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'The stock quantity of the product.',
    example: 100,
    type: Number,
    required: false,
  })
  @IsInt()
  stock?: number;

  @ApiProperty({
    description: 'The description of the product.',
    example: 'This is a high-quality product.',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Description is too short. Minimum length is 5 characters.',
  })
  description?: string;

  @ApiProperty({
    description: 'The name of the product.',
    example: 'Product Name',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short. Minimum length is 3 characters.',
  })
  name?: string;
}
