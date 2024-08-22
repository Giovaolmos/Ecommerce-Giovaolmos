import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
// import { Product, products } from "./products.tempData";
import { v4 as uuidv4 } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entitites/products.entity";
import { Repository } from "typeorm";
import { Category } from "src/entitites/categories.entity";
import * as data from "../../utils/data.json"

@Injectable()
export class ProductsRepository {
constructor(@InjectRepository(Product)
private productsRepository: Repository<Product>,
@InjectRepository(Category)
private categoriesRepository: Repository<Category>
){}


  async getProducts(page: number, limit: number): Promise<Product[]> {
let products = await this.productsRepository.find({
  relations:{
    category: true,
  },
});
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({id});
   if(!product) throw new NotFoundException(`This ID: ${id} does not belong to any product`)
   return product;
  }

  async addProduct() {
    //* Verificar que exista la categoría:
const categories = await this.categoriesRepository.find();
data?.map(async(element) => {
  const category = categories.find(
    (categoryFind) => categoryFind.name === element.category,
  );  
  //* Creación de un nuevo producto:
  const product = new Product();
  product.name = element.name;
  product.description = element.description;
  product.price = element.price;
  product.imgUrl = element.imgUrl;
  product.stock = element.stock;
  product.category = category; 

  //* Grabamos el producto en la base de datos:
  await this.productsRepository
  .createQueryBuilder()
  .insert()
  .into(Product)
  .values(product)
  //* Actualizamos el producto si es que ya existe:
  .orUpdate(
['description', 'price', 'imgUrl', 'stock'], ['name']
  )
  .execute();
});
return 'Products added'
  }

  async updateProduct(id: string, product: Product)  {
    if (!id) throw new NotFoundException(`ID: ${id} not found`);
    
    const response = await this.productsRepository.update(id, product);
    if(!response || response === undefined) throw new BadRequestException();
    
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    
    if (!updatedProduct) throw new NotFoundException(`Product with ID: ${id} not found after update`);
    return updatedProduct;
}

}