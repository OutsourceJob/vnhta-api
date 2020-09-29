import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../config';
import * as _ from 'lodash';

const { type, host, username, password, database, port } = config;

export const mysqlOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.NODE_ENV === "development",
};
