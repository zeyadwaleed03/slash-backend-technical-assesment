import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ProductService } from './product.service';

import { ProductDto, UpdateProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import {
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
  ViewProductsResponse,
} from './swaggerResponses';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiCreatedResponse({
    description: 'Product added successfully.',
    type: CreateProductResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addProduct(@GetUser() user: User, @Body() dto: ProductDto) {
    return await this.productService.addProduct(user, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':productId')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({
    description: 'Product deleted successfully.',
    type: DeleteProductResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'You do not have permission to delete this product',
  })
  async deleteProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: User,
  ) {
    return await this.productService.deleteProduct(productId, user);
  }

  @Get()
  @ApiOperation({ summary: 'View all products' })
  @ApiOkResponse({
    description: 'Products fetched successfully.',
    type: ViewProductsResponse,
  })
  async viewProducts() {
    return await this.productService.viewProducts();
  }

  @UseGuards(JwtGuard)
  @Patch(':productId')
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'Product updated successfully.',
    type: UpdateProductResponse,
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to edit this product',
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: User,
    @Body() dto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(productId, user, dto);
  }
}
