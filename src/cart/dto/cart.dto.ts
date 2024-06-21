import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({ example: 1, description: 'ID of the product' })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsInt()
  @Min(1, {
    message: 'Quantity must be at least 1.',
  })
  quantity: number;
}
