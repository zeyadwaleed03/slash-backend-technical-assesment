import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    PrismaModule,
    CartModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
  ],
})
export class AppModule {}
