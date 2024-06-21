import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class OrderCouponDto {
  @ApiProperty({
    example: 10,
    description:
      'The percentage discount of the coupon to be applied. Must be between 1 and 90.',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Coupon must be at least 1%.' })
  @Max(90, { message: 'Coupon cannot be greater than 90%.' })
  coupon: number;
}
