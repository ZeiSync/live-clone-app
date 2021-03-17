import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiDefaultResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiBody({ type: SignInDto })
  @ApiDefaultResponse({
    schema: {
      properties: {
        acessToken: {
          type: 'string',
        },
      },
    },
  })
  async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signup')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    description:
      'Account create successfully !!! Password has been sent to your mail',
  })
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/google/signin')
  @ApiResponse({ description: 'Redirect to goougle sign in page' })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('Redirect to goougle sign in page');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiDefaultResponse({
    schema: {
      properties: {
        acessToken: {
          type: 'string',
        },
      },
    },
  })
  googleAuthRedirect(@GetUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.googleLogin(user);
  }
}
