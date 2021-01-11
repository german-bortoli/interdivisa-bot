export default {
  env: process.env.NODE_ENV ?? 'development',
  db: {
    username: process.env.POSTGRES_USER ?? 'postgres',
    host: process.env.POSTGRES_HOST ?? 'localhsot',
    database: process.env.POSTGRES_DB ?? 'interdivisa_bot',
    password: process.env.POSTGRES_PASSWORD ?? 'password123',
    port: process.env.POSTGRES_PORT ?? 5432,
  },
  botToken: process.env.BOT_TOKEN ?? '',
};
