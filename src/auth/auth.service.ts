import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from '../dto/registeruser.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async registerUser(registerUserDto : RegisterDto ){
        console.log('registeruserDto' , registerUserDto);
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        
        
        const user = await this.userService.createUser({...registerUserDto, password : hash });
        console.log(user);
        
        return {message : "User registered successfully"}
    }
}
