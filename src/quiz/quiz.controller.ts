import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ParseObjectIdPipe } from 'src/pipes/objectid.pipes';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
import { Quiz } from './schema/quiz.schema';

@UseGuards(AuthGuard())
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get(':eventId')
  async getAllByEventId(
    @Param('eventId', ParseObjectIdPipe) eventId: string,
  ): Promise<Quiz[]> {
    return this.quizService.find({ event: eventId });
  }

  @Post()
  async createQuiz(
    @GetUser() user: User,
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.createQuiz(user, createQuizDto);
  }

  @Put('/:id')
  async updateQuiz(
    @Param('id', ParseObjectIdPipe) id: string,
    @GetUser() user: User,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(id, user, updateQuizDto);
  }
}
