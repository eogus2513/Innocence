import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entity/admin.entity';
import { Category } from 'src/title/entity/category.entity';
import { Subject } from 'src/title/entity/subject.entity';
import { User } from 'src/user/entity/user.entity';
import { Video } from 'src/video/entity/video.entity';
import { Title } from '../title/entity/title.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Admin, User, Category, Subject, Title, Video],
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
