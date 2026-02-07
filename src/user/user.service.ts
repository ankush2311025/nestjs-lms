import { Injectable ,} from '@nestjs/common';
import { RegisterDto } from 'src/dto/registeruser.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto : RegisterDto){
        
        return  await this.userModel.create({
            fname : registerUserDto.fname,
            lname : registerUserDto.lname,
            email : registerUserDto.email,
            password : registerUserDto.password
        });
    }
}
