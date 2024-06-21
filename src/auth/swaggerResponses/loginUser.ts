import { ApiProperty } from '@nestjs/swagger';
import { SignupResponse } from './signupUser';

export class LoginResponse {
  @ApiProperty({ type: SignupResponse, description: 'logged in user data' })
  user: SignupResponse;
  @ApiProperty({
    description:
      'The JSON Web Token (JWT) assigned to the user for authentication.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;
}
