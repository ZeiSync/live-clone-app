import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModle: Model<UserDocument>) {}

  async findById(_id: Schema.Types.ObjectId): Promise<User> {
    const user: User = await this.userModle.findById(_id).lean();
    if (!user) {
      return null;
    }
    return user;
  }

  async findOne(options: any): Promise<User> {
    const user = await this.userModle.findOne(options).lean();
    if (!user) {
      return null;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModle(createUserDto);

      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        // dulicate email
        throw new ConflictException('the_email_address_is_already_taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<any> {
    const { _id } = updateUserDto;
    try {
      const user = await this.findById(_id);
      if (!user) {
        return null;
      }
      return await this.userModle.updateOne(updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
