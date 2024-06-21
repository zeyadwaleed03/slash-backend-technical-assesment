import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
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
  @ApiProperty({
    description: 'The userName of the user.',
    example: 'zeyad',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short. Minimum length is 3 characters.',
  })
  name: string;
  @ApiProperty({
    description: 'The address of the user.',
    example: 'cairo nasr city',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Address is too short. Minimum length is 3 characters.',
  })
  address: string;
}
