import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from './product';

export class UpdateProductResponse {
  @ApiProperty({ type: ProductResponse })
  product: ProductResponse;

  @ApiProperty({ example: 'Product updated successfully.' })
  message: string;
}
