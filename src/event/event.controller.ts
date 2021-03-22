import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/pipes/objectid.pipes';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateEventAndUserDto } from './dto/create-event-and-user.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { Event } from './schemas/event.schema';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiResponse({ type: [Event] })
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.find({});
  }

  @Get('my-event')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ type: [Event] })
  async getUserEvent(@GetUser() user: User): Promise<Event[]> {
    return this.eventService.find({ ownerId: user['_id'] });
  }

  @Get(':id')
  @ApiOkResponse({ type: Event })
  async getEventById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Event> {
    return this.eventService.findById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateEventDto })
  @ApiCreatedResponse({ type: Event })
  @UseGuards(AuthGuard())
  async createEvent(
    @GetUser() user: User,
    @Body(ValidationPipe) createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.createEvent(user, createEventDto);
  }

  @Post('/event-user')
  @ApiBody({ type: CreateEventAndUserDto })
  async createEventAndUser(
    @Body(ValidationPipe) createEventAndUserDto: CreateEventAndUserDto,
  ): Promise<void> {
    this.eventService.createEventAndUser(createEventAndUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiBody({ type: UpdateEventDto })
  @ApiOkResponse({ type: Event })
  async updateEvent(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(ValidationPipe) updateEventDto: UpdateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    console.log(updateEventDto);
    return this.eventService.updateEvent(id, updateEventDto, user);
  }
}
