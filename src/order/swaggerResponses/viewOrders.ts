import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './order';

export class ViewOrdersResponse {
  @ApiProperty({
    type: [OrderResponse],
    description: 'The orders retrieved to certain user.',
  })
  orders: OrderResponse[];

  @ApiProperty({
    example: 'Orders fetched successfully.',
    description: 'Message confirming the successful retrieval of orders.',
  })
  message: string;
}
