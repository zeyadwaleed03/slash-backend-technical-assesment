import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async addProduct(user: User, dto: ProductDto) {
    const { price, description, name, stock } = dto;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        userId: user.userId,
        stock,
      },
    });

    return { product, message: 'Product added successfully.' };
  }
  async deleteProduct(productId: number, user: User) {
    const product = await this.prisma.product.findUnique({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    if (product.userId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this product',
      );
    }
    await this.prisma.product.delete({
      where: { productId },
    });
    return {
      message: 'Product deleted successfully',
    };
  }
  async viewProducts() {
    const products = await this.prisma.product.findMany();
    return { products, message: 'Products fetched successfuly' };
  }
  async updateProduct(productId: number, user: User, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.userId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to edit this product',
      );
    }
    const updatedProduct = await this.prisma.product.update({
      where: {
        productId,
      },
      data: dto,
    });
    return { product: updatedProduct, message: 'Product updated successfuly.' };
  }
}
