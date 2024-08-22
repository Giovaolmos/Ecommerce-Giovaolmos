import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/entitites/products.entity"

export class PostOrderDto{
    
    /**
     *  UUID extraído de la base de datos
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
     * Array de Mínimo 1 de length
     */
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>
}