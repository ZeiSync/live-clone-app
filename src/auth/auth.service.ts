import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as helper from '../helper/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/schemas/user.schema';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { renderEmailContent, sendEmail } from 'src/utils/sendmail';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { IGooglePayload } from './interfaces/google-payload-interface';

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
      const accessToken = await this.jwtService.sign(payload.name);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { name, email } = signUpDto;
    const randomString: string = helper.generateRandomString();

    const data = { name, email, randomString };
    try {
      const emailContent = await renderEmailContent({
        template: 'register',
        data,
      });
      await sendEmail({ to: email, html: emailContent });
      const passwordHashed: string = await bcrypt.hash(randomString, 10);
      const user: CreateUserDto = {
        ...signUpDto,
        password: passwordHashed,
      };
      await this.userService.create(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async googleLogin(googlePayload: IGooglePayload) {
    if (!googlePayload) {
      throw new UnauthorizedException();
    }
    const { email } = googlePayload;
    try {
      const user: User = await this.userService.findOne({ email });
      if (!user) {
        const createUserDto: CreateUserDto = {
          ...googlePayload,
        };
        await this.userService.create(createUserDto);
        const accessToken = await this.jwtService.sign(createUserDto);
        return { accessToken };
      }
      const updateUserDto: UpdateUserDto = {
        _id: user['_id'],
        ...googlePayload,
      };
      await this.userService.update(user['_id'], updateUserDto);
      const accessToken = await this.jwtService.sign(googlePayload.name);
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
