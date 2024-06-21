import { ApiProperty } from '@nestjs/swagger';
import { CartProduct } from './cartProduct';

export class AddToCartResponse {
  @ApiProperty({
    type: CartProduct,
  })
  createdItem: CartProduct;

  @ApiProperty({ example: 'Product added to cart successfully.' })
  message: string;
}
