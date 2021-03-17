import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModle: Model<UserDocument>) {
    super(userModle);
  }
}
