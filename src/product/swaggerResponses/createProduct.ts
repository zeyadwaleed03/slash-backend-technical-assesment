import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from './product';

export class CreateProductResponse {
  @ApiProperty({ type: ProductResponse })
  product: ProductResponse;

  @ApiProperty({ example: 'Product added successfully.' })
  message: string;
}
