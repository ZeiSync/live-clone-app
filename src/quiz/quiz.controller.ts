import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/pipes/objectid.pipes';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
import { Quiz } from './schema/quiz.schema';

@ApiTags('Quiz')
@UseGuards(AuthGuard())
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get(':eventId')
  @ApiOkResponse({ type: [Quiz] })
  async getAllByEventId(
    @Param('eventId', ParseObjectIdPipe) eventId: string,
  ): Promise<Quiz[]> {
    return this.quizService.find({ event: eventId });
  }

  @Post()
  @ApiBody({ type: CreateQuizDto })
  @ApiCreatedResponse({ type: Quiz })
  @UsePipes(ValidationPipe)
  async createQuiz(
    @GetUser() user: User,
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.createQuiz(user, createQuizDto);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateQuizDto })
  @ApiOkResponse({ type: Quiz })
  @UsePipes(ValidationPipe)
  async updateQuiz(
    @Param('id', ParseObjectIdPipe) id: string,
    @GetUser() user: User,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(id, user, updateQuizDto);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async deleteQuiz(
    @Param('id', ParseObjectIdPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.quizService.deleteQuiz(id, user);
  }
}
