import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './order';

export class GetOrderByIdResponse {
  @ApiProperty({
    type: OrderResponse,
    description: 'The order retrieved by its ID.',
  })
  order: OrderResponse;

  @ApiProperty({
    example: 'Order fetched successfully.',
    description: 'Message confirming the successful retrieval of the order.',
  })
  message: string;
}
