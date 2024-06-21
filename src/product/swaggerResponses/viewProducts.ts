import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from './product';

export class ViewProductsResponse {
  @ApiProperty({ type: [ProductResponse] })
  products: ProductResponse[];

  @ApiProperty({ example: 'Products fetched successfully' })
  message: string;
}
