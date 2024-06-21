import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CartDto } from './dto';
import { User } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  DeleteFromCartResponse,
  AddToCartResponse,
  UpdateCartResponse,
  ViewCartResponse,
} from './swaggerResponses';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiCreatedResponse({
    description: 'Product added to cart successfully.',
    type: AddToCartResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Insufficient product stock.' })
  @ApiNotFoundResponse({
    description: 'Product with provided Id is not found.',
  })
  async addToCart(@GetUser() user: User, @Body() dto: CartDto) {
    return await this.cartService.addToCart(user, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'View user cart' })
  @ApiOkResponse({
    description: 'Cart fetched successfully.',
    type: ViewCartResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: "Can't access other users carts." })
  @ApiNotFoundResponse({ description: 'User not found' })
  async viewCart(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser() user: User,
  ) {
    return await this.cartService.viewCart(userId, user);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  @ApiOperation({ summary: 'Update product quantity in cart' })
  @ApiOkResponse({
    description: 'Product quantity updated successfully.',
    type: UpdateCartResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Insufficient product stock.' })
  @ApiNotFoundResponse({ description: 'Product not found in cart' })
  async updateCart(@GetUser() user: User, @Body() dto: CartDto) {
    return await this.cartService.updateCart(user, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiOkResponse({
    description: 'The product is deleted from cart successfully.',
    type: DeleteFromCartResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Product not found in cart' })
  async deleteFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: User,
  ) {
    return await this.cartService.deleteFromCart(productId, user);
  }
}
