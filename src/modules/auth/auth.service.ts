import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entitites/users.entity';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ){}
    getAuth(){
        return "funcion GET Auth"
    }

    async signIn(email: string, password: string){
    
    
    const user = await this.usersRepository.getUserByEmail(email);
    if(!user) throw new BadRequestException('Incorrect credentials');
    
    
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new BadRequestException('Incorrect credentials');

    
    const payload = {id: user.id, email: user.email, isAdmin: user.isAdmin};
    const token = this.jwtService.sign(payload);
    
    
    return {
        message: 'User logged in successfully',
        token,
    };
}

async signUp(user: Partial<User>){

    
    const {email, password} = user;
    
    
    const foundUser = await this.usersRepository.getUserByEmail(email);         
    if(foundUser) throw new BadRequestException('Email already exists');

    
    const hashedPassword = await bcrypt.hash(password, 10);                 

    return await this.usersRepository.addUser({
        ...user,
        password: hashedPassword
    })
}
}
