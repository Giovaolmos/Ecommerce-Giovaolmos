import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".development.env" });

const config = {
  type: "postgres",
  // host: process.env.DB_HOST,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
  dropSchema: false,
  // logging: true,
};

export const typeOrmConfig = registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
