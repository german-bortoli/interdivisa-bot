let entities = 'src/entities/*.entity.ts';

if (process.env.NODE_ENV === 'production') {
  entities = 'build/entities/*.entity.js';
}

if (process.env.ORM_ENTITIES) {
  entities = process.env.ORM_ENTITIES;
}

export default {
  env: process.env.NODE_ENV ?? 'development',
  db: {
    username: process.env.POSTGRES_USER ?? 'postgres',
    host: process.env.POSTGRES_HOST ?? 'localhsot',
    database: process.env.POSTGRES_DB ?? 'interdivisa_bot',
    password: process.env.POSTGRES_PASSWORD ?? 'password123',
    port: process.env.POSTGRES_PORT ?? 5432,
    entities,
  },
  botToken: process.env.BOT_TOKEN ?? '',
};
