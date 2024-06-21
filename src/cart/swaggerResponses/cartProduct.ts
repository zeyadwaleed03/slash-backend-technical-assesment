import { ProductResponse } from 'src/product/swaggerResponses/product';

import { ApiProperty } from '@nestjs/swagger';
export class CartProduct {
  @ApiProperty({ example: 1 })
  cartId: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ type: ProductResponse })
  product: ProductResponse;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
