import { ApiProperty } from '@nestjs/swagger';
import { CartProduct } from './cartProduct';

export class UpdateCartResponse {
  @ApiProperty({
    type: CartProduct,
  })
  updatedItem: CartProduct;

  @ApiProperty({ example: 'Product quantity updated successfully.' })
  message: string;
}
