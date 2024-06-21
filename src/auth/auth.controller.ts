import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignupResponse, LoginResponse } from './swaggerResponses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({
    description: 'User was created successfully.',
    type: SignupResponse,
  })
  @ApiBadRequestResponse({ description: 'Error: Bad Request' })
  @ApiForbiddenResponse({
    description: 'Error: Forbidden',
    schema: {
      example: {
        message: 'Email already exists.',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiOkResponse({
    description: 'User signed in successfully',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
