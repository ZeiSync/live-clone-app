import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallBack } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('client_id'),
      clientSecret: configService.get('client_secret'),
      callbackURL: configService.get('callback_url'),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallBack,
  ): Promise<any> {
    console.log(profile);
    const {
      _json: { sub, name, email, picture, locale },
    } = profile;
    const user = {
      googleId: sub,
      email,
      name,
      picture,
      locale,
      accessToken,
    };
    done(null, user);
  }
}
