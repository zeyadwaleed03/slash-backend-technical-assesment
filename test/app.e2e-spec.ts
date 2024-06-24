import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from 'src/auth/dto';
import { ProductDto } from 'src/product/dto';
import { CartDto } from 'src/cart/dto';
import { ConfigService } from '@nestjs/config';
import { OrderCouponDto, OrderStatusDto } from 'src/order/dto';
pactum.handler.addDataFuncHandler('strToN', (ctx) => {
  return parseInt(ctx.args[0]);
});
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    await app.init();
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3333;

    await app.listen(port);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(`http://localhost:${port}`);
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('signup', () => {
      it('should signup user 1', () => {
        const dto: SignupDto = {
          email: 'zeyad@hotmail.com',
          password: 'password123',
          address: 'cairo nasr city',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('userId1', 'userId');
      });
      it('should signup user 2', () => {
        const dto: SignupDto = {
          email: 'zeyad12@hotmail.com',
          password: 'password123',
          address: 'cairo nasr city',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('userId2', 'userId');
      });
      it('should signup user 3', () => {
        const dto: SignupDto = {
          email: 'zeyadwaleed@hotmail.com',
          password: 'password123',
          address: 'cairo nasr city',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('userId3', 'userId');
      });
      it('should throw bad request error for invalid email', () => {
        const dto: SignupDto = {
          email: 'zeyadhotmail.com',
          password: 'password123',
          address: 'cairo nasr city',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for empty body', () => {
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw bad request error for invalid name', () => {
        const dto: SignupDto = {
          email: 'zeyadhotmail.com',
          password: 'password123',
          address: 'cairo nasr city',
          name: 'z',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid address', () => {
        const dto: SignupDto = {
          email: 'zeyadhotmail.com',
          password: 'password123',
          address: 'c',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid password', () => {
        const dto: SignupDto = {
          email: 'zeyad@hotmail.com',
          password: 'pas',
          address: 'cairo nasr city',
          name: 'zeyad',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
    });

    describe('login', () => {
      it('should login user 1', () => {
        const dto: LoginDto = {
          email: 'zeyad@hotmail.com',
          password: 'password123',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(200)

          .stores('token', 'token');
      });

      it('should login user 2', () => {
        const dto: LoginDto = {
          email: 'zeyad12@hotmail.com',
          password: 'password123',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(200)

          .stores('token1', 'token');
      });
      it('should login user 3', () => {
        const dto: LoginDto = {
          email: 'zeyadwaleed@hotmail.com',
          password: 'password123',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(200)

          .stores('token2', 'token');
      });
      it('should throw bad request error for invalid email', () => {
        const dto: LoginDto = {
          email: 'zeyadhotmail.com',
          password: 'password123',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid password', () => {
        const dto: LoginDto = {
          email: 'zeyad@hotmail.com',
          password: 'pas',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(400);
      });
      it("should throw unauthorized error for credintials that doesn't exist", () => {
        const dto: LoginDto = {
          email: 'z@hotmail.com',
          password: 'passssss1',
        };
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(403);
      });
      it('should throw bad request error for empty body', () => {
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody({})
          .expectStatus(400);
      });
    });
  });
  describe('Products', () => {
    describe('Add product', () => {
      it('should add a product', () => {
        const dto: ProductDto = {
          price: 20,
          stock: 5,
          description: 'This is a high-quality product.',
          name: 'Product 1',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('firstProductId', 'product.productId');
      });
      it('should add a product', () => {
        const dto: ProductDto = {
          price: 100,
          stock: 3,
          description: 'This is a high-quality product.',
          name: 'Product 2',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('secoundProductId', 'product.productId');
      });
      it('should add a product', () => {
        const dto: ProductDto = {
          price: 20,
          stock: 2,
          description: 'This is a high-quality product.',
          name: 'Product 3',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('thirdProductId', 'product.productId');
      });
      it('should add a product', () => {
        const dto: ProductDto = {
          price: 20,
          stock: 5,
          description: 'This is a high-quality product.',
          name: 'Product 4',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('fourthProductId', 'product.productId');
      });
      it('should throw unauthorized error', () => {
        const dto: ProductDto = {
          price: 20,
          stock: 5,
          description: 'This is a high-quality product.',
          name: 'Product 4',
        };
        return pactum
          .spec()
          .post('/api/products')

          .withBody(dto)
          .expectStatus(401);
      });
      it('should throw bad request error for empty body', () => {
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody({})
          .expectStatus(400);
      });
      it('should throw bad request error for invalid name', () => {
        const dto: ProductDto = {
          price: 20,
          stock: 5,
          description: 'This is a high-quality product.',
          name: '1',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid price', () => {
        const dto: ProductDto = {
          price: '12' as any,
          stock: 5,
          description: 'This is a high-quality product.',
          name: 'product',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid stock', () => {
        const dto: ProductDto = {
          price: 5,
          stock: '12' as any,
          description: 'This is a high-quality product.',
          name: 'product',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(400);
      });
      it('should throw bad request error for invalid description', () => {
        const dto: ProductDto = {
          price: 5,
          stock: 5,
          description: 'g.',
          name: 'product',
        };
        return pactum
          .spec()
          .post('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(400);
      });
    });
    describe('View products', () => {
      it('should get all  products', () => {
        return pactum
          .spec()
          .get('/api/products')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200);
      });
    });
    describe('Delete product', () => {
      it('should delete product fourth product', () => {
        return pactum
          .spec()
          .delete('/api/products/$S{fourthProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(200);
      });
      it("should throw forbidden error for trying to delete product user did'nt he create", () => {
        return pactum
          .spec()
          .delete('/api/products/$S{firstProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(403);
      });
      it('should throw unauthorized error', () => {
        return pactum.spec().delete('/api/products/1').expectStatus(401);
      });
    });
    describe('Edit product', () => {
      it("should edit product's name with id 3", () => {
        const dto = {
          name: 'PRODUCT 3',
        };
        return pactum
          .spec()
          .patch('/api/products/$S{thirdProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(200);
      });
      it("should edit product's price with id 3", () => {
        const dto = {
          price: 1,
        };
        return pactum
          .spec()
          .patch('/api/products/$S{thirdProductId}')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(200);
      });
      it("should edit product's stock with id 3", () => {
        const dto = {
          stock: 7,
        };
        return pactum
          .spec()
          .patch('/api/products/$S{thirdProductId}')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(200);
      });
      it("should edit product's name with id 3", () => {
        const dto = {
          name: 'PRODUCT 3',
        };
        return pactum
          .spec()
          .patch('/api/products/$S{thirdProductId}')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(200);
      });

      it("should throw forbidden error for trying to edit product user did'nt he create", () => {
        return pactum
          .spec()
          .patch('/api/products/$S{firstProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(403);
      });
      it('should throw unauthorized error', () => {
        return pactum.spec().patch('/api/products/1').expectStatus(401);
      });
    });
  });
  describe('Cart', () => {
    describe('Add product to cart', () => {
      it('should throw bad request error for trying to get quantity higher than product stock', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('firstProductId'),
          quantity: 6,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(400);
      });

      it('should add product 1 to cart to user 2', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('firstProductId'),
          quantity: 4,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(201);
      });

      it('should add product 1 to cart to user 1', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('firstProductId'),
          quantity: 1,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(201);
      });
      it('should add product 3 to cart to user 2', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('thirdProductId'),
          quantity: 4,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(201);
      });

      it('should add product 2 to cart to user 2', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('secoundProductId'),
          quantity: 2,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)
          .expectStatus(201);
      });

      it('should add product 2 to cart to user 1', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('secoundProductId'),
          quantity: 1,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(201);
      });

      it('should throw unauthorized error', () => {
        return pactum.spec().post('/api/cart/add').expectStatus(401);
      });
      it('should throw not found error error for trying to access non existent product ', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('firstProductId') + 3,
          quantity: 1,
        };
        return pactum
          .spec()
          .post('/api/cart/add')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(404);
      });
    });
    describe('View products in cart', () => {
      it('should view cart of user 1', () => {
        return pactum
          .spec()
          .get('/api/cart/$S{userId1}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200);
      });
      it('should view cart of user 2', () => {
        return pactum
          .spec()
          .get('/api/cart/$S{userId2}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(200);
      });
      it('should view cart of user 3', () => {
        return pactum
          .spec()
          .get('/api/cart/$S{userId3}')
          .withHeaders({ Authorization: 'Bearer $S{token2}' })
          .expectStatus(200);
      });

      it("should throw forbidden error for trying to acces other user's cart", () => {
        return pactum
          .spec()
          .get('/api/cart/$S{userId2}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(403);
      });
      it('should throw not found error for trying to acces non exist user cart', () => {
        const userId = pactum.stash.getDataStore('userId1') + 3;
        return pactum
          .spec()
          .get(`/api/cart/${userId}`)
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(403);
      });
      it('should throw unauthorized error', () => {
        return pactum.spec().get('/api/cart/$S{userId2}').expectStatus(401);
      });
    });
    describe('Update product quantity in cart', () => {
      it('should throw unauthorized error', () => {
        return pactum.spec().put('/api/cart/update').expectStatus(401);
      });
      it('should update product 1  quantity in the cart of user 1', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('firstProductId'),
          quantity: 2,
        };
        return pactum
          .spec()
          .put('/api/cart/update')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(200);
      });
      it('should update product 2  quantity in the cart of user 1', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('secoundProductId'),
          quantity: 3,
        };
        return pactum
          .spec()
          .put('/api/cart/update')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(200);
      });
      it('should update product 3  quantity in the cart of user 2', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('thirdProductId'),
          quantity: 3,
        };
        return pactum
          .spec()
          .put('/api/cart/update')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)

          .expectStatus(200);
      });
      it('should throw  bad request error for trying to update product 3  quantity in the cart of user 2 with greater than stock', () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('thirdProductId'),
          quantity: 100,
        };
        return pactum
          .spec()
          .put('/api/cart/update')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .withBody(dto)

          .expectStatus(400);
      });
      it("should throw bad request error for trying to update product 3  quantity in the cart of user 1 as it doesn't exist in the cart", () => {
        const dto: CartDto = {
          productId: pactum.stash.getDataStore('thirdProductId'),
          quantity: 3,
        };
        return pactum
          .spec()
          .put('/api/cart/update')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(404);
      });
    });
    describe('Delete product from cart', () => {
      it('should delete product 3 from the cart of user 2', () => {
        return pactum
          .spec()
          .delete('/api/cart/remove/$S{thirdProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })

          .expectStatus(200);
      });
      it('should throw not found error for trying to delete product 3 from the cart of user 1 as it doesnt exist', () => {
        return pactum
          .spec()
          .delete('/api/cart/remove/$S{thirdProductId}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(404);
      });
      it('should throw unauthorized error', () => {
        return pactum
          .spec()
          .delete('/api/cart/remove/$S{firstProductId}')
          .expectStatus(401);
      });
    });
  });
  describe('Orders', () => {
    describe('Create order', () => {
      it('should create order for user 1', () => {
        return pactum
          .spec()
          .post('/api/orders')
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(201)
          .stores('orderId', 'order.orderId');
      });
      it("should throw not found error for no items found in user's cart", () => {
        return pactum
          .spec()
          .post('/api/orders')
          .withHeaders({ Authorization: 'Bearer $S{token2}' })
          .expectStatus(404);
      });
      it('should throw not found error for insufficient product stock', () => {
        return pactum
          .spec()
          .post('/api/orders')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(404);
      });
      it('should throw unauthorized error', () => {
        return pactum.spec().post('/api/orders').expectStatus(401);
      });
    });
    describe('Update order status', () => {
      it('should throw unauthorized error', () => {
        return pactum
          .spec()
          .put('/api/orders/$S{orderId}/status')
          .expectStatus(401);
      });
      it('should updated status of first order to processing for user 1', () => {
        const dto: OrderStatusDto = {
          status: 'processing',
        };
        return pactum
          .spec()
          .put('/api/orders/$S{orderId}/status')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(200);
      });
    });
    describe('View order', () => {
      it('should throw unauthorized error', () => {
        return pactum.spec().get('/api/orders/$S{orderId}').expectStatus(401);
      });
      it("should throw forbidden error for trying to access order user didn't create", () => {
        return pactum
          .spec()
          .get('/api/orders/$S{orderId}')
          .withHeaders({ Authorization: 'Bearer $S{token1}' })
          .expectStatus(403);
      });
      it("should throw not found error for trying to access order that doesn't exist", () => {
        const orderId = pactum.stash.getDataStore('orderId') + 50;
        return pactum
          .spec()
          .get(`/api/orders/${orderId}`)
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(404);
      });
      it('should get first order of user 1', () => {
        return pactum
          .spec()
          .get('/api/orders/$S{orderId}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200);
      });
    });
    describe('Apply coupon to  order', () => {
      it('should throw unauthorized error', () => {
        return pactum.spec().post('/api/orders/apply-coupon').expectStatus(401);
      });
      it('should apply coupon 50% to  first order of user 1', () => {
        const dto: OrderCouponDto = {
          coupon: 50,
        };
        return pactum
          .spec()
          .post('/api/orders/apply-coupon')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(201);
      });
      it('should throw bad request error for entering invalid coupon', () => {
        const dto: OrderCouponDto = {
          coupon: 99,
        };
        return pactum
          .spec()
          .post('/api/orders/apply-coupon')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(400);
      });
      it('should throw not found error for trying to apply coupon to non existing order', () => {
        const dto: OrderCouponDto = {
          coupon: 50,
        };
        return pactum
          .spec()
          .post('/api/orders/apply-coupon')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token2}' })

          .expectStatus(404);
      });
    });
    describe('update order status', () => {
      it('should updated status of first order to failed for user 1', () => {
        const dto: OrderStatusDto = {
          status: 'failed',
        };
        return pactum
          .spec()
          .put('/api/orders/$S{orderId}/status')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(200);
      });
      it('should thow forbidden error for trying to update status of order with failed status', () => {
        const dto: OrderStatusDto = {
          status: 'pending',
        };
        return pactum
          .spec()
          .put('/api/orders/$S{orderId}/status')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(403);
      });
    });
    describe('Apply coupon to order', () => {
      it('should throw forbidden error for trying to apply coupon on order in failed status', () => {
        const dto: OrderCouponDto = {
          coupon: 50,
        };
        return pactum
          .spec()
          .post('/api/orders/apply-coupon')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(403);
      });
    });
  });
  describe('Users', () => {
    describe('View user orders', () => {
      it('should throw unauthorized error', () => {
        return pactum
          .spec()
          .get('/api/users/$S{userId1}/orders')
          .expectStatus(401);
      });
      it('should throw not found error for no orders found for specified user', () => {
        return pactum
          .spec()
          .get('/api/users/$S{userId3}/orders')

          .withHeaders({ Authorization: 'Bearer $S{token2}' })

          .expectStatus(404);
      });
      it('should throw not found error for no orders found for specified user', () => {
        return pactum
          .spec()
          .get('/api/users/$S{userId3}/orders')

          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(404);
      });
      it('should get orders of user 1', () => {
        return pactum
          .spec()
          .get('/api/users/$S{userId1}/orders')

          .withHeaders({ Authorization: 'Bearer $S{token2}' })

          .expectStatus(200);
      });
      it('should get orders of user 1', () => {
        return pactum
          .spec()
          .get('/api/users/$S{userId1}/orders')

          .withHeaders({ Authorization: 'Bearer $S{token}' })

          .expectStatus(200);
      });
    });
  });
});
