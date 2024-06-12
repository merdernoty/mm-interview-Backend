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
        entities: [],
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
