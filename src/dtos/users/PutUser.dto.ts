import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator"

export class PutUserDto{
    
       /**
     * Debe ser un string de entre 3 y 80 caracteres 
     * @example 'Test User01'
     */
    @IsOptional()
    @IsString()
    @Length(3, 80 )
    name: string
    

    /**
     * Por el momento no se permite actualizar el email
     */
    @IsEmpty()
    email:string
    
    /**
     * Debe contener entre 8 y 15 caracteres, e incluir una letra al menos una minúscula, una mayúscula, un número y un carácter especial
     * @example 'AAbb11!!'
     */
    @IsOptional()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, { message: 'Password too weak' })
    password: string

    /**
     * Debe ser un string entre 3 y 80 caracteres 
     * @example 'Test street 1234'
     */
    @Length(3, 80)
    adress: string

    /**
     * Debe ser un number
     * @example 123456789
     */
    @IsOptional()
    @IsNumber()
    phone: number
    
    /**
     * Debe ser un país entre 4 y 20 caracteres
     * @example 'Test Country'
     */
    @IsOptional()
    @IsString()
    @Length(4, 20)   //-5: Perú, chad, Mali, Togo 
    country: string 
    
    /**
     * Debe ser un string entre 3 y 20 caracteres
     * @example 'Test City'
     */
    @IsOptional()
    @IsString()
    @Length(3, 20)  //-4:Ica(Perú), Ado(Nigeria)
    city: string 
}