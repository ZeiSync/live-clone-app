/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiBody({ type: SignInDto })
  async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signup')
  @ApiBody({ type: SignUpDto })
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // redirect to google authentication page
  };

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@GetUser() user: User) {
    return this.authService.googleLogin(user);
  }
}
