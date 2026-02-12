import { ConflictException, Injectable ,} from '@nestjs/common';
import { RegisterDto } from 'src/dto/registeruser.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto : RegisterDto){
        
       try{
         return  await this.userModel.create({
            fname : registerUserDto.fname,
            lname : registerUserDto.lname,
            email : registerUserDto.email,
            password : registerUserDto.password
        });
       }catch(err: unknown){
        console.log(err);
        const e = err as { code?: number};
        const Duplicate_key_code = 11000;
        if (e.code === Duplicate_key_code){
            throw new ConflictException('Email already exists');
        }
        throw err;
       }
    }
    async getUserById(id : string){
        return await this.userModel.findOne({_id : id});
    }
}
