import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { ValidationPipe } from "@nestjs/common";
import { config as dotenvConfig } from "dotenv";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swaggerConfig";

dotenvConfig({ path: ".development.env" });

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  app.use(LoggerMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT);
  console.log(`Server listening on http://localhost:${PORT}`);
}
bootstrap();
