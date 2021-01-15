import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config';

export default async (): Promise<Connection> => {
  const connectionOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: Number(config.db.port),
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
    logging: config.env !== 'production',
    entities: ['src/entities/*.entity.ts'],
  };

  // create a connection using modified connection options
  return await createConnection(connectionOptions);
};
