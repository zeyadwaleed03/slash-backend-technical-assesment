import { ApiProperty } from '@nestjs/swagger';
import { CartResponse } from './cartResponse';

export class ViewCartResponse {
  @ApiProperty({ type: CartResponse })
  cart: CartResponse;
  @ApiProperty({ example: 'Cart fetched successfully.' })
  message: string;
}
