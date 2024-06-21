import { ApiProperty } from '@nestjs/swagger';

export class SignupResponse {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'zeyad@hotmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'zeyad',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the user.',
    example: 'cairo nasr city',
  })
  address: string;

  @ApiProperty({
    description: 'The date and time when the user was created.',
    example: '2023-06-21T10:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The date and time when the user was last updated.',
    example: '2023-06-21T10:00:00Z',
  })
  updatedAt: string;
  @ApiProperty({
    description: 'The unique identifier of the cart.',
    example: 1,
  })
  cartId: number;
  @ApiProperty({
    description: 'The total quantity of items in the cart.',
    example: 0,
  })
  totalQuantity: number;
}
