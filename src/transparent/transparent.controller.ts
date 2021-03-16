import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTransparentDto } from './dto/create-transparent.dto';
import { Transparent } from './schemas/transparent.schema';
import { TransparentService } from './transparent.service';

@Controller('transparent')
export class TransparentController {
  constructor(private transparentService: TransparentService) {}

  @Get()
  async getAll(): Promise<Transparent[]> {
    return this.transparentService.find({});
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    createTransparentDto: CreateTransparentDto,
  ): Promise<Transparent> {
    return this.transparentService.create(createTransparentDto);
  }
}
