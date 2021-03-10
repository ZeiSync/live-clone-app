import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModle: Model<UserDocument>) {}

  async findById(_id: ObjectId): Promise<User> {
    const user: User = await this.userModle.findById(_id).lean();

    return user;
  }

  async findOne(options: any): Promise<User> {
    const user = await this.userModle.findOne(options).lean();
    if (!user) {
      throw new NotFoundException('user_is_not_found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModle(createUserDto);
    return createdUser.save();
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { email } = updateUserDto;
    const user = await this.findOne({ email });

    return user;
  }
}
