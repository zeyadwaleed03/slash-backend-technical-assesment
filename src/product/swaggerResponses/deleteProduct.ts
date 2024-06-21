import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResponse {
  @ApiProperty({ example: 'Product deleted successfully' })
  message: string;
}
