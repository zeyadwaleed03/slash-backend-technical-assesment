import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { OrderItemResponse } from './orderItem';

export class OrderResponse {
  @ApiProperty({ example: 1 })
  orderId: number;

  @ApiProperty({ example: '2023-06-21T10:00:00Z' })
  orderDate: Date;

  @ApiProperty({ example: '2023-06-21T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: OrderStatus.pending })
  status: OrderStatus;

  @ApiProperty({ example: 200.0 })
  totalPrice: number;
  @ApiProperty({ example: 20 })
  coupon: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: [OrderItemResponse] })
  orderItems: OrderItemResponse[];
}
