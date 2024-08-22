import { JwtModule } from "@nestjs/jwt";
import {config as dotenvConfig} from "dotenv"
dotenvConfig({ path: '.development.env' })

export const jwtConfig = JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: '60min'},
})