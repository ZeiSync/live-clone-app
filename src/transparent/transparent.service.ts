import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { Transparent, TransparentDocument } from './schemas/transparent.schema';

@Injectable()
export class TransparentService extends BaseService<TransparentDocument> {
  constructor(
    @InjectModel(Transparent.name)
    private transparentModel: Model<TransparentDocument>,
  ) {
    super(transparentModel);
  }
}
