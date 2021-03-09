import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as helper from '../../helper/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/schemas/user.schema';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    try {
      const user: User = await this.userService.findOne({ email });

      const match: boolean = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UnauthorizedException('Incorrect email or password');
      }
      delete user.password;
      const payload: IJwtPayload = { ...user };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { name, email } = signUpDto;
    const string: string = helper.generateRandomString();
    console.log(string);
    const passwordHashed: string = await bcrypt.hash(string, 10);
    const user: CreateUserDto = {
      name,
      email,
      password: passwordHashed,
    };
    await this.userService.create(user);
  }
}
