import { Module, ValidationPipe } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { AccessStrategy } from 'src/middleware/stratege/jwt-access.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Video } from '../video/entity/video.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Title } from '../title/entity/title.entity';
import { APP_PIPE } from '@nestjs/core';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Title, Video]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_JWT'),
      }),
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AccessStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AdminModule {}
