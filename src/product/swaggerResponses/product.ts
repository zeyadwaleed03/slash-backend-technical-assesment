import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty({
    description: 'The unique identifier of the product.',
    example: 1,
  })
  productId: number;

  @ApiProperty({
    description: 'The name of the product.',
    example: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the product.',
    example: 'This is a high-quality product.',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the product.',
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: 'The stock quantity of the product.',
    example: 100,
  })
  stock: number;

  @ApiProperty({
    description: 'The date and time when the product was created.',
    example: '2023-06-21T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the product was last updated.',
    example: '2023-06-21T10:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The unique identifier of the user who created the product.',
    example: 1,
  })
  userId: number;
}
