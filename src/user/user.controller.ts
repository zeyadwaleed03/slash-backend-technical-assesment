import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ViewOrdersResponse } from 'src/order/swaggerResponses';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':userId/orders')
  @ApiOperation({ summary: 'View user orders' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Fetched user orders by user id.',

    type: ViewOrdersResponse,
  })
  @ApiNotFoundResponse({ description: 'No orders found' })
  async viewOrders(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.viewOrders(userId);
  }
}
