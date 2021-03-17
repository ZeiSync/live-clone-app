import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTransparentDto } from './dto/create-transparent.dto';
import { Transparent } from './schemas/transparent.schema';
import { TransparentService } from './transparent.service';

@ApiTags('Transparent')
@Controller('transparent')
export class TransparentController {
  constructor(private transparentService: TransparentService) {}

  @Get()
  async getAll(): Promise<Transparent[]> {
    return this.transparentService.find({});
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateTransparentDto })
  @ApiBearerAuth()
  async create(
    @Body() createTransparentDto: CreateTransparentDto,
  ): Promise<Transparent> {
    return this.transparentService.create(createTransparentDto);
  }
}
