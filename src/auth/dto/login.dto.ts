import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'zeyad@hotmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'The password of the user.',
    example: 'pass1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Password is too short. Minimum length is 5 characters.',
  })
  password: string;
}
