import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
    };
  }
}
