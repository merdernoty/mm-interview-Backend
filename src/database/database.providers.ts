import { User } from "src/modules/user/model/user.model";
import { Question } from "src/modules/question/model/question.model";
import { Theme } from "src/modules/theme/model/theme.model";
import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Question, Theme],
        synchronize: true,
        ssl:
          process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
      });
      return dataSource;
    },
  },
];
