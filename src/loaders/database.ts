import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config';

export default async (): Promise<Connection> => {
  let connectionOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: Number(config.db.port),
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: config.env !== 'production',
    entities: ['src/entities/*.entity.ts'],
  };

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    connectionOptions['ssl'] = {
      rejectUnauthorized: false,
    };
  }

  // create a connection using modified connection options
  return await createConnection(connectionOptions);
};
