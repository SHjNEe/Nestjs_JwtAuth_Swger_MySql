import * as path from 'path';
import * as entities from './entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';
const basename = path.basename(__dirname);
import 'reflect-metadata';

// Check typeORM documentation for more information.
const ormConfig: any = {
  type: 'mysql',
  database: 'take_orders',
  url: config.MYSQL_URL,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  entities: Object.values(entities),
  charset: 'utf8mb4',
  keepConnectionAlive: true,

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: ['error'],

  logger: 'file',
  maxQueryExecutionTime: 120000,

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [basename + '/migrations/*{.ts,.js}'],
  seed: ['src/database/seeds/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
  cli: {
    // migrationsDir: basename + '/migrations',
    seedersDir: 'src/databases/seeds',
    factoriesDir: 'src/databases/factories',
  },
  // multipleStatements: true,
  // cache: {
  //   type: 'redis',
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  // },
};

export = ormConfig;
