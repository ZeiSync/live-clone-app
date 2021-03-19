import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model, Document, FilterQuery, Types } from 'mongoose';

@Injectable()
export abstract class BaseService<T extends Document> {
  private readonly modelName: string;

  constructor(private readonly model: Model<T>) {
    for (const modelName of Object.keys(model.collection.conn.models)) {
      if (model.collection.conn.models[modelName] === this.model) {
        this.modelName = modelName;
        break;
      }
    }
  }

  async find(
    conditions: Partial<Record<keyof T, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T[]> {
    try {
      return await this.model
        .find(conditions as FilterQuery<T>, projection, options)
        .lean();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(
    id: Types.ObjectId,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      return await this.model.findById(id, projection, options).lean();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(
    conditions: Partial<Record<keyof T, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      return await this.model
        .findOne(conditions as FilterQuery<T>, projection, options)
        .lean();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createModelDto: Partial<Record<keyof T, unknown>>): Promise<T> {
    try {
      const model = new this.model(createModelDto);
      return await model.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('this_email_address_is_already_taken');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(id: Types.ObjectId, updateModelDto: any): Promise<T> {
    try {
      console.log(id);
      console.log(updateModelDto);
      return await this.model.findByIdAndUpdate(id, updateModelDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(conditions: Partial<Record<keyof T, unknown>>): Promise<void> {
    try {
      await this.model.remove(conditions);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
