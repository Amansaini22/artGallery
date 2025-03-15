import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArtistSchema, ArtistSchemaClass } from "./entities/artist.schema";
import { ArtistRepository } from "../artist.repository";
import { ArtistsDocumentRepository } from "./repositories/artist.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArtistSchemaClass.name, schema: ArtistSchema },
    ]),
  ],
  providers: [
    {
      provide: ArtistRepository,
      useClass: ArtistsDocumentRepository,
    },
  ],
  exports: [ArtistRepository],
})
export class DocumentArtistPersistenceModule {}
