import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { AccessStrategy } from 'src/stratege/jwt-access.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.ACCESS_JWT,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AccessStrategy],
})
export class AdminModule {}
