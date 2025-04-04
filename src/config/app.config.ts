import { registerAs } from "@nestjs/config";
import { AppConfig } from "./app-config.type";
import validateConfig from "../utils/validate-config";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  API_GATEWAY_URL: string;

  @IsString()
  @IsOptional()
  GAME_SERVICE_URL: string;

  @IsString()
  @IsOptional()
  CONFIG_SERVICE_URL: string;
}

export default registerAs<AppConfig>("app", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || "development",
    name: process.env.APP_NAME || "app",
    workingDirectory: process.env.PWD || process.cwd(),
    port: process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    apiPrefix: process.env.API_PREFIX || "",
    apiGatewayUrl: process.env.API_GATEWAY_URL || "",
  };
});
