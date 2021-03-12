import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { email } = updateUserDto;
    const user = await this.findOne({ email });

    return user;
  }
}
