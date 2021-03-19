import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const validObjectId: boolean = isValidObjectId(value);

    if (validObjectId) {
      throw new BadRequestException('invalid_ojectId');
    }

    const objectId: Types.ObjectId = Types.ObjectId.createFromHexString(value);
    return objectId;
  }
}
