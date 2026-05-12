import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'people-orbit-db',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
});