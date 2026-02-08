import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from '../dto/registeruser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private jwtService: JwtService){}

    async registerUser(registerUserDto : RegisterDto ){
        console.log('registeruserDto' , registerUserDto);
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        
        
        const user = await this.userService.createUser({...registerUserDto, password : hash });
        const payload = {sub: user._id, };
        const token = await this.jwtService.signAsync({payload})


        console.log(token);
        
        return {access_token : token};
    }
}
