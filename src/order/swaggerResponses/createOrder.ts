import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './order';

export class createOrderResponse {
  @ApiProperty({ type: OrderResponse })
  order: OrderResponse;

  @ApiProperty({ example: 'Order created successfuly' })
  message: string;
}
