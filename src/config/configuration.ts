export default () => ({
  openaiApiKey: process.env.OPENAI_API_KEY,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DATABASE,
  },
});
