import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { BaseService } from 'src/base.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateEventAndUserDto } from './dto/create-event-and-user.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/event.schema';
import * as moment from 'moment';

@Injectable()
export class EventService extends BaseService<EventDocument> {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private authService: AuthService,
  ) {
    super(eventModel);
  }

  async createEventAndUser(
    createEventAndUserDto: CreateEventAndUserDto,
  ): Promise<void> {
    const user: SignUpDto = createEventAndUserDto.user;
    const event: CreateEventDto = createEventAndUserDto.event;

    const userId = Types.ObjectId();
    user['_id'] = userId;
    event['ownerId'] = userId;

    if (moment(event.startTime).isAfter(event.endTime)) {
      throw new BadRequestException('invalid_time');
    }

    if (!moment(event.startDate).isSame(event.startTime, 'day')) {
      throw new BadRequestException('invalid_time');
    }
    try {
      await Promise.all([this.authService.signUp(user), this.create(event)]);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createEvent(
    user: User,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    createEventDto['ownerId'] = user['_id'];
    try {
      return await this.create(createEventDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
    user: User,
  ): Promise<Event> {
    const event = await this.findOne({ _id: id, ownerId: user['_id'] });
    if (!event) {
      throw new NotFoundException('event_not_found');
    }
    try {
      return await this.update(id, updateEventDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
