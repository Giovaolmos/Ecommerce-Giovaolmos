import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostLoginUserDto } from 'src/dtos/users/PostLoginUser.dto';
import { PostCreateUserDto } from 'src/dtos/users/PostCreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signup')
    signUp(@Body() user: PostCreateUserDto ){
        return this.authService.signUp(user);
    };

    @Post('signin')
    signIn(@Body() credentials: PostLoginUserDto){
        const {email, password} = credentials;
        return this.authService.signIn(email, password)
    };
};
