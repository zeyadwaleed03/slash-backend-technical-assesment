import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from 'src/product/swaggerResponses';

export class OrderItemResponse {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: '2023-06-21T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-06-21T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ type: ProductResponse })
  product: ProductResponse;
}
