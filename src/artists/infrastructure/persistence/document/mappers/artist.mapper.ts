import { Artist } from "@src/artists/domain/artist";
import { ArtistSchemaClass } from "../entities/artist.schema";

export class ArtistMapper {
  static toDomain(raw: ArtistSchemaClass): Artist {
    const domainEntity = new Artist();
    domainEntity.id = raw._id.toString();
    domainEntity.artist_name = raw.artist_name;
    domainEntity.artist_medium = raw.artist_medium;
    domainEntity.artist_category = raw.artist_category;
    domainEntity.artist_dob = raw.artist_dob;
    domainEntity.died = raw.died;
    domainEntity.artist_tag_line = raw.artist_tag_line;
    domainEntity.artist_description = raw.artist_description;
    domainEntity.facebook_link = raw.facebook_link;
    domainEntity.instagram_link = raw.instagram_link;
    domainEntity.twitter_link = raw.twitter_link;
    domainEntity.banner_image = raw.banner_image;
    domainEntity.artist_profile_image = raw.artist_profile_image;
    domainEntity.artist_highlight = raw.artist_highlight;
    domainEntity.country = raw.country;
    domainEntity.profession = raw.profession;
    domainEntity.artist_status = raw.artist_status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Artist): ArtistSchemaClass {
    const persistenceEntity = new ArtistSchemaClass();

    if (domainEntity.id && typeof domainEntity.id === "string") {
      persistenceEntity._id = domainEntity.id;
    }

    persistenceEntity.artist_name = domainEntity.artist_name;
    persistenceEntity.artist_medium = domainEntity.artist_medium;
    persistenceEntity.artist_category = domainEntity.artist_category;
    persistenceEntity.artist_dob = domainEntity.artist_dob;
    persistenceEntity.died = domainEntity.died;
    persistenceEntity.artist_tag_line = domainEntity.artist_tag_line;
    persistenceEntity.artist_description = domainEntity.artist_description;
    persistenceEntity.facebook_link = domainEntity.facebook_link;
    persistenceEntity.instagram_link = domainEntity.instagram_link;
    persistenceEntity.twitter_link = domainEntity.twitter_link;
    persistenceEntity.banner_image = domainEntity.banner_image;
    persistenceEntity.artist_profile_image = domainEntity.artist_profile_image;
    persistenceEntity.artist_highlight = domainEntity.artist_highlight;
    persistenceEntity.country = domainEntity.country;
    persistenceEntity.profession = domainEntity.profession;
    persistenceEntity.artist_status = domainEntity.artist_status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}