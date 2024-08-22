import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class PostCreateUserDto{
    

    /**
     * Debe ser un string de entre 3 y 80 caracteres 
     * @example 'Test User01'
     */
    @IsNotEmpty()
    @IsString()
    @Length(3, 80 )
    name: string
    

    /**
     * Debe ser un string con formato de email
     * @example 'user01@example.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email:string

    /**
     * Debe contener entre 8 y 15 caracteres, e incluir una letra al menos una minúscula, una mayúscula, un número y un carácter especial
     * @example 'AAbb11!!'
     */
    
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, { message: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&* ' })
    password: string


    /**
     * Debe coincidir con el password
     * @example 'AAbb11!!'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;
    

    /**
     * Debe ser un string entre 3 y 80 caracteres 
     * @example 'Test street 1234'
     */
    @Length(3, 80)
    address: string
    
    /**
     * Debe ser un number
     * @example 123456789
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number
    
    /**
     * Debe ser un país entre 4 y 20 caracteres
     * @example 'Test Country'
     */
    @IsString()
    @Length(4, 20)   
    country: string 
    
    
    /**
     * Debe ser un string entre 3 y 20 caracteres
     * @example 'Test City'
     */
    @IsString()
    @Length(3, 20)  
    city: string 

    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean

    @IsNotEmpty()
    birthdate: Date
    
}