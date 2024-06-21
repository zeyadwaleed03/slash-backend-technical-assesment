import { ApiProperty } from '@nestjs/swagger';

export class DeleteFromCartResponse {
  @ApiProperty({ example: 'The product is deleted from cart successfully.' })
  message: string;
}
