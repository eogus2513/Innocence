import { Module } from '@nestjs/common';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Title } from './entity/title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Title])],
  controllers: [TitleController],
  providers: [TitleService],
})
export class TitleModule {}
