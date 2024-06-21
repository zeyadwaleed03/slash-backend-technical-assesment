import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItem, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addToCart(user: User, dto: CartDto) {
    const { productId, quantity } = dto;
    const product = await this.prisma.product.findUnique({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('Product with provided Id is not found.');
    }
    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient product stock.');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
    });
    let updatedItem: CartItem;
    if (!cartItem) {
      updatedItem = await this.prisma.cartItem.create({
        data: {
          cartId: user.cartId,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      });
    } else {
      updatedItem = await this.prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: user.cartId,
            productId,
          },
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
    }
    await this.prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        totalQuantity: user.totalQuantity + quantity,
      },
    });

    return {
      createdItem: updatedItem,
      message: 'Product added to cart successfuly.',
    };
  }
  async updateCart(user: User, dto: CartDto) {
    const { productId, quantity } = dto;
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
      include: {
        product: true,
      },
    });
    if (!cartItem) {
      throw new NotFoundException('Product not found in cart.');
    }
    if (quantity > cartItem.product.stock + cartItem.quantity) {
      throw new BadRequestException('Insufficient product stock.');
    }
    const updatedItem = await this.prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
      data: {
        quantity,
      },
      include: {
        product: true,
      },
    });

    await this.prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        totalQuantity: user.totalQuantity + quantity - cartItem.quantity,
      },
    });

    return {
      updatedItem,
      message: 'Product quantity updated successfully.',
    };
  }
  async deleteFromCart(productId: number, user: User) {
    const product = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          productId,
          cartId: user.cartId,
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found in cart.');
    }
    await this.prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        totalQuantity: user.totalQuantity - product.quantity,
      },
    });
    await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
    });
    return { message: 'The product is deleted from cart successfuly.' };
  }
  async viewCart(userId: number, user: User) {
    if (userId !== user.userId) {
      throw new ForbiddenException("Can't access other users carts.");
    }
    const cartProducts = await this.prisma.cartItem.findMany({
      where: {
        cartId: user.cartId,
      },
      include: {
        product: true,
      },
    });
    return {
      cart: {
        products: cartProducts,
        totalQuantity: user.totalQuantity,
        cartId: user.cartId,
      },
      message: 'Cart fetched successfuly.',
    };
  }
}
