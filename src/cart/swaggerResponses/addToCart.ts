import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';

export class AddToCartResponse {
  @ApiProperty({
    example: {
      cartId: 1,
      productId: 1,
      quantity: 2,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
  })
  createdItem: CartItem;

  @ApiProperty({ example: 'Product added to cart successfully.' })
  message: string;
}
