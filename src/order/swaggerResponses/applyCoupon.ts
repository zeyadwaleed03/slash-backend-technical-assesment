import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './order';

export class ApplyCouponToOrderResponse {
  @ApiProperty({ type: OrderResponse })
  order: OrderResponse;

  @ApiProperty({ example: 'Coupon applied successfully.' })
  message: string;
}
