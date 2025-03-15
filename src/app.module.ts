import { Module } from "@nestjs/common";
import databaseConfig from "./database/config/database.config";
import appConfig from "./config/app.config";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./database/mongoose-config.service";
import { ArtistsModule } from "./artists/artists.module";
import { ProductsModule } from "./products/products.module";

// <database-block>
const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});
// </database-block>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: [".env"],
    }),
    infrastructureDatabaseModule,
    ArtistsModule,
    ProductsModule,
  ],
})
export class AppModule {}
