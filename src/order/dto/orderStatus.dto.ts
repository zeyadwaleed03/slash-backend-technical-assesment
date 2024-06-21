import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OrderStatusDto {
  @ApiProperty({
    example: OrderStatus.pending,
    description:
      'The status of the order. Possible values are pending, processing, completed, failed, shipped, delivered, cancelled, returned and refunded.',
  })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
