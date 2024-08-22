import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('NestjsApi')
.setDescription('Proyecto Integrador Modulo 4 - Back')
.setVersion('1.0.0')
.addBearerAuth()
.build()