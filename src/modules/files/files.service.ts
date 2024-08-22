import { Injectable, NotFoundException } from "@nestjs/common";
import { FilesRepository } from "./files.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entitites/products.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilesService{
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>
  ){}

  async uploadImage(productId: string, file: Express.Multer.File){
const product = await this.productsRepository.findOneBy({id: productId})       //* Busco producto por ID
if(!product){throw new NotFoundException('Product not found')};               //! Lanzo un NotFoundException en caso de que no exista

const response = await this.filesRepository.uploadImage(file);              //* Si se encontró un producto, cargo la imagen en Cloudinary
if(!response.secure_url){ throw new NotFoundException("Error uploading image to Cloudinary")} //! Si no existe response.secure_url es porque no se subió.

 await this.productsRepository.update(productId,{  
  imgUrl: response.secure_url                                           //* Actualizo la propiedad imgUrl del producto encontrado  con la nueva secure_url.
});
return await this.productsRepository.findOneBy({id: productId})       //* Devuelvo el producto actualizado
}
  }