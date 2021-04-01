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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { Pricing } from './schemas/pricing.schema';
import { PricingService } from './pricing.service';

@ApiTags('Pricing')
@Controller('Pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get()
  @ApiResponse({ type: [Pricing] })
  async getAll(): Promise<Pricing[]> {
    return this.pricingService.find({});
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Pricing })
  @ApiBody({ type: CreatePricingDto })
  async create(@Body() createPricingDto: CreatePricingDto): Promise<Pricing> {
    return this.pricingService.create(createPricingDto);
  }
}
