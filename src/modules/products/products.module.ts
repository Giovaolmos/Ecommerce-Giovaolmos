import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entitites/products.entity';
import { Category } from 'src/entitites/categories.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product, Category])
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {
  
}