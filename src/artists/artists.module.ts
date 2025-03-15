import { Module } from "@nestjs/common";

import { ArtistsController } from "./artists.controller";

import { ArtistsService } from "./artists.service";
import { DocumentArtistPersistenceModule } from "./infrastructure/persistence/document/document-persistence.module";

// <database-block>
const infrastructurePersistenceModule = DocumentArtistPersistenceModule;
// </database-block>

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService, infrastructurePersistenceModule],
})
export class ArtistsModule {}
