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
        host: process.env.HOST,
        port: Number(process.env.PORT),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [User,Question,Theme],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      try {
        await dataSource.initialize();
        console.log("Database connection successfully");
      } catch (error) {
        console.error("Database connection failed", error);
        throw error;
      }

      return dataSource;
    },
  },
];
