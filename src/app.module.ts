import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { Account } from './account/account.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { SubCategory } from './subcategory/subcategory.entity';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/brand.entity';
import { CollectionModule } from './collection/collection.module';
import { Collection } from './collection/collection.entity';
import { ColorModule } from './color/color.module';
import { Color } from './color/color.entity';
import { DiscountModule } from './discount/discount.module';
import { Discount } from './discount/discount.entity';
import { ImageModule } from './image/image.module';
import { Image } from './image/image.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/customer.entity';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { OrderModule } from './order/order.module';
import { Like } from './like/like.entity';
import { Order } from './order/order.entiry';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './role/roles.decorator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_TEST_HOST,
      port: parseInt(process.env.DB_TEST_PORT),
      username: process.env.DB_TEST_USERNAME,
      password: process.env.DB_TEST_PASSWORD,
      database: process.env.DB_TEST_DATABASE,
      entities: [Account, Category, SubCategory, Brand, Collection, Color, Discount, Image, Product, Customer, Like, Order, Transaction],
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
    }),
    AccountModule,
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    CollectionModule,
    ColorModule,
    DiscountModule,
    ImageModule,
    ProductModule,
    CustomerModule,
    CommentModule,
    LikeModule,
    OrderModule,
    TransactionModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }],
})
export class AppModule { }
