import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus, User } from '@prisma/client';
import { OrderCouponDto, OrderStatusDto } from './dto';
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(user: User) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: user.cartId,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      throw new NotFoundException(`No items found in the user's cart.`);
    }
    const updateOperations = cartItems.map(async (cartItem) => {
      if (cartItem.product.stock >= cartItem.quantity) {
        await this.prisma.product.update({
          where: { productId: cartItem.productId },
          data: {
            stock: {
              decrement: cartItem.quantity,
            },
          },
        });
      } else {
        throw new NotFoundException(
          `Product ${cartItem.product.name} does not have enough stock please adjust quantity of product in cart to be less than or equal stock.`,
        );
      }
    });

    await Promise.all(updateOperations);
    let totalPrice = 0;
    const orderItems = cartItems.map((cartItem) => {
      totalPrice += cartItem.product.price * cartItem.quantity;
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      };
    });
    const order = await this.prisma.order.create({
      data: {
        userId: user.userId,
        totalPrice,
        OrderItem: {
          create: orderItems,
        },
      },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: user.cartId,
      },
    });
    await this.prisma.user.update({
      where: { userId: user.userId },
      data: {
        totalQuantity: 0,
      },
    });
    return {
      order: { ...order, orderItems: order.OrderItem, OrderItem: undefined },
      message: 'Order created successfuly',
    };
  }
  async updateOrderStatus(orderId: number, dto: OrderStatusDto) {
    const { status } = dto;
    // if (!(status in OrderStatus)) {
    //   throw new ForbiddenException(`Invalid order status. Valid statuses are: ${Object.values(OrderStatus).join(', ')}`);
    // }

    const order = await this.prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    if (order.status === OrderStatus.failed) {
      throw new ForbiddenException(
        `Cannot update order status because it is already in failed status.`,
      );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { orderId },
      data: { status },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (status === OrderStatus.failed) {
      await this.adjustProductStock(orderId);
    }
    return {
      order: {
        ...updatedOrder,
        orderItems: updatedOrder.OrderItem,
        OrderItem: undefined,
      },
      message: 'Order status updated successfuly.',
    };
  }

  private async adjustProductStock(orderId: number): Promise<void> {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId },
    });

    const updateOperations = orderItems.map((orderItem) =>
      this.prisma.product.update({
        where: { productId: orderItem.productId },
        data: {
          stock: {
            increment: orderItem.quantity,
          },
        },
      }),
    );

    await Promise.all(updateOperations);
  }
  async getOrderById(orderId: number, user: User) {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    if (order.userId !== user.userId) {
      throw new ForbiddenException(
        `You are not authorized to access this order.`,
      );
    }

    return {
      order: { ...order, orderItems: order.OrderItem, OrderItem: undefined },
      message: 'Order fetched successfuly.',
    };
  }
  async applyCouponToOrder(dto: OrderCouponDto, user: User) {
    const { coupon } = dto;
    const order = await this.prisma.order.findFirst({
      where: {
        userId: user.userId,
      },
      orderBy: {
        orderDate: 'desc',
      },
    });

    if (!order) {
      throw new NotFoundException(`No order found to apply the coupon.`);
    }

    if (
      order.status !== OrderStatus.pending &&
      order.status !== OrderStatus.processing
    ) {
      throw new ForbiddenException(
        'Coupon can only be applied to orders with status processing or pending.',
      );
    }
    let discountedTotalPrice: number;
    if (order.coupon) {
      discountedTotalPrice =
        (order.totalPrice / (1 - order.coupon / 100)) * (1 - coupon / 100);
    } else {
      discountedTotalPrice = order.totalPrice * (1 - coupon / 100);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { orderId: order.orderId },
      data: {
        totalPrice: discountedTotalPrice,
        coupon,
      },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    return {
      order: {
        ...updatedOrder,
        orderItems: updatedOrder.OrderItem,
        OrderItem: undefined,
      },
      message: 'Coupon applied successfuly.',
    };
  }
}
