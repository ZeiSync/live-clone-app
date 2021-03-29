import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { EventModule } from 'src/event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    EventModule,
    AuthModule,
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
