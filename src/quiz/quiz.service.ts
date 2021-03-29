import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { EventService } from 'src/event/event.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schema/quiz.schema';

@Injectable()
export class QuizService extends BaseService<QuizDocument> {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    private eventService: EventService,
  ) {
    super(quizModel);
  }

  async createQuiz(user: User, createQuizDto: CreateQuizDto): Promise<Quiz> {
    const event = await this.eventService.findById(createQuizDto.event);

    if (!event) {
      throw new BadRequestException('event_not_found');
    }

    if (event['ownerId'].toString() !== user['_id'].toString()) {
      throw new BadRequestException('this_event_is_not_your');
    }

    try {
      return await this.create(createQuizDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateQuiz(id: string, user: User, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizModel.findById(id).populate('event').lean();

    if (!quiz) {
      throw new BadRequestException('quiz_not_found');
    }
    if (!quiz.event) {
      throw new BadRequestException('event_not_found');
    }
    if (quiz.event['ownerId'].toString() !== user['_id'].toString()) {
      throw new BadRequestException('this_event_is_not_your');
    }

    const updateQuiz: UpdateQuizDto = {
      ...quiz,
      ...updateQuizDto,
      answers: updateQuizDto.answers ? updateQuizDto.answers : quiz.answers,
    };

    try {
      return await this.update(id, updateQuiz);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteQuiz(id: string, user: User) {
    const quiz = await this.quizModel.findById(id).populate('event').lean();

    if (!quiz) {
      throw new BadRequestException('quiz_not_found');
    }
    if (!quiz.event) {
      throw new BadRequestException('event_not_found');
    }
    if (quiz.event['ownerId'].toString() !== user['_id'].toString()) {
      throw new BadRequestException('this_event_is_not_your');
    }
    try {
      return await this.delete({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
