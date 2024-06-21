import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async viewOrders(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(`No orders found.`);
    }
    const returenedOrders = orders.map((order) => {
      return { ...order, orderItems: order.OrderItem, OrderItem: undefined };
    });
    return {
      orders: returenedOrders,
      message: 'Orders fetched successfuly.',
    };
  }
}
