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
    logging: config.env !== 'production',
    entities: [config.db.entities],
  };

  if (process.env.POSTGRES_SSL) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    connectionOptions['ssl'] = {
      rejectUnauthorized: false,
    };
  }

  // create a connection using modified connection options
  return await createConnection(connectionOptions);
};
