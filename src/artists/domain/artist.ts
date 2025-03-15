import { ApiProperty } from "@nestjs/swagger";
import databaseConfig from "../../database/config/database.config";
import { DatabaseConfig } from "../../database/config/database-config.type";

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Artist {
  @ApiProperty({
    type: idType,
  })
  id: string | number;

  @ApiProperty({
    type: String,
    example: "John Doe",
  })
  artist_name: string;

  @ApiProperty({
    type: [String],
    example: ["Painter", "Sculptor"],
  })
  artist_medium: string[];

  @ApiProperty({
    type: String,
    example: "Contemporary",
  })
  artist_category: string;

  @ApiProperty({
    type: String,
    format: "date",
    example: "1990-01-01",
  })
  artist_dob: Date;

  @ApiProperty({
    type: String,
    format: "date",
    example: "2020-01-01",
  })
  died: Date;

  @ApiProperty({
    type: String,
    example: "Art is life",
  })
  artist_tag_line: string;

  @ApiProperty({
    type: String,
    example: "Detailed biography of the artist...",
  })
  artist_description: string;

  @ApiProperty({
    type: String,
    example: "https://facebook.com/artist",
  })
  facebook_link: string;

  @ApiProperty({
    type: String,
    example: "https://instagram.com/artist",
  })
  instagram_link: string;

  @ApiProperty({
    type: String,
    example: "https://twitter.com/artist",
  })
  twitter_link: string;

  @ApiProperty({
    type: String,
    example: "banner.jpg",
  })
  banner_image: string;

  @ApiProperty({
    type: String,
    example: "profile.jpg",
  })
  artist_profile_image: string;

  @ApiProperty({
    type: String,
    example: "Notable achievements and highlights",
  })
  artist_highlight: string;

  @ApiProperty({
    type: String,
    example: "India",
  })
  country: string;

  @ApiProperty({
    type: String,
    example: "Contemporary Artist",
  })
  profession: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  artist_status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}