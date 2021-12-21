import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';
import { Admin } from '../admin/entity/admin.entity';
import { User } from '../user/entity/user.entity';
import { Category } from '../title/entity/category.entity';
import { Subject } from '../title/entity/subject.entity';
import { Title } from '../title/entity/title.entity';
import { Video } from '../video/entity/video.entity';

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  tby: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Admin, User, Category, Subject, Title, Video],
    synchronize: false,
    logging: true,
  },
};

export { connectionOptions };
