import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../entities/video.entity';
<<<<<<< HEAD
import { Title } from '../entities/title.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Title, Video])],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
>>>>>>> master
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
