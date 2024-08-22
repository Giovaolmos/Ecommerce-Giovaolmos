import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}
  async getProducts(page: number, limit: number) {
    return await this.productsRepository.getProducts(page, limit);
  };
  
  async getProductById(id: string){
    return this.productsRepository.getProductById(id);
  };

  async addProduct(){
    return await this.productsRepository.addProduct();
  };

  async updateProduct(id: string, product: any){
    return await this.productsRepository.updateProduct(id, product);
  };



}