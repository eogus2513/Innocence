import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { TitleModule } from './title/title.module';
import { TypeormConfigModule } from './typeorm/typeorm-config.module';

@Module({
  imports: [
    TypeormConfigModule,
    AdminModule,
    UserModule,
    VideoModule,
    TitleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
