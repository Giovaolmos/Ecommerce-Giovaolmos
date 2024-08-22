import { IsNotEmpty } from "class-validator";

export class PostLoginUserDto {

    /**
     * Debe ser un string con formato de email
     * @example 'user01@example.com'
    */
    @IsNotEmpty()
    email: string;

    /**
     * Debe contener entre 8 y 15 caracteres, e incluir una letra al menos una minúscula, una mayúscula, un número y un carácter especial
     * @example 'AAbb11!!'
    */
    @IsNotEmpty()
    password: string;
}