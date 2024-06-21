import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { OrderService } from './order.service';
import { User } from '@prisma/client';
import { OrderCouponDto, OrderStatusDto } from './dto';

import {
  ApplyCouponToOrderResponse,
  GetOrderByIdResponse,
  UpdateOrderStatusResponse,
  createOrderResponse,
} from './swaggerResponses';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiNotFoundResponse({ description: "No items found in the user's cart." })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: createOrderResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: "No items found in the user's cart." })
  async createOrder(@GetUser() user: User) {
    return await this.orderService.createOrder(user);
  }

  @UseGuards(JwtGuard)
  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update order status by orderId' })
  @ApiOkResponse({
    description: 'Order status updated successfully.',
    type: UpdateOrderStatusResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiForbiddenResponse({
    description:
      'Cannot update order status because it is already in failed status.',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  async updateOrderStatus(
    @Body() dto: OrderStatusDto,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return await this.orderService.updateOrderStatus(orderId, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':orderId')
  @ApiOperation({ summary: 'Get order details by orderId' })
  @ApiOkResponse({
    description: 'Order fetched successfully.',
    type: GetOrderByIdResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'You are not authorized to access this order.',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  async getOrderById(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return await this.orderService.getOrderById(orderId, user);
  }

  @UseGuards(JwtGuard)
  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply coupon to the latest order' })
  @ApiCreatedResponse({
    description: 'Coupon applied successfully.',
    type: ApplyCouponToOrderResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid coupon data provided' })
  @ApiForbiddenResponse({
    description:
      'Coupon can only be applied to orders with status processing or pending.',
  })
  @ApiNotFoundResponse({ description: 'No order found to apply the coupon.' })
  async applyCouponToOrder(@Body() dto: OrderCouponDto, @GetUser() user: User) {
    return this.orderService.applyCouponToOrder(dto, user);
  }
}
