import { Controller, Post, Body, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/registeruser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // this decorator defines the route prefix by auth
export class AuthController {
    constructor(
        private readonly authService : AuthService, 
        private readonly userService: UserService, 
    ){}

    @Post('register')
    async register (@Body() registerUserDto : RegisterDto ){
        const token = await this.authService.registerUser(registerUserDto)
        return token;
    }
    @Post('login')
    async login(){
        //todo : implement 
        //1. Receive email and password
        //2. Match the email and password 
        //3. Genrate JWT tokens 
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        const userId = req.user?.payload?.sub;
        
        const user = await this.userService.getUserById(userId);

        if(!user){
            throw new NotFoundException("User not Found") 
        }
        
        return {
            id : user?._id,
            fname : user?.fname,
            lname : user?.lname,
            email : user?.email,
            role : user?.role
        };
        
    }
}
