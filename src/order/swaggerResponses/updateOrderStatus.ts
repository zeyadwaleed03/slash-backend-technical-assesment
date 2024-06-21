import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './order';

export class UpdateOrderStatusResponse {
  @ApiProperty({ type: OrderResponse })
  order: OrderResponse;

  @ApiProperty({ example: 'Order status updated successfully.' })
  message: string;
}
