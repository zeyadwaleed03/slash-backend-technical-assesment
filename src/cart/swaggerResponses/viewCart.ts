import { ApiProperty } from '@nestjs/swagger';
import { CartProduct } from './cartProduct';

export class ViewCartResponse {
  @ApiProperty({ example: 1 })
  cartId: number;

  @ApiProperty({ example: 2 })
  totalQuantity: number;

  @ApiProperty({ type: [CartProduct] })
  products: CartProduct[];

  @ApiProperty({ example: 'Cart fetched successfully.' })
  message: string;
}
