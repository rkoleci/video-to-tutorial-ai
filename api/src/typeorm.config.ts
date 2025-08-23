 
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { join } from 'path';

const env = process.env.NODE_ENV || 'development';
console.log(111, 'MODE: ', env)

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`)
});
 
const entitiesPattern: string = join(
  process.cwd(),
  'dist/**/*.entity.js',
);
const migrationsPattern: string = join(
  process.cwd(),
  'src/migrations/*{.ts,.js}',
);
 
export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [entitiesPattern], 
    migrations: [migrationsPattern],
    // ssl: {
    //   rejectUnauthorized: false
    // },
    synchronize: false,
    logging: true,
logger: 'advanced-console'
});