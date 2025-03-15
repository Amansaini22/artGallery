import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  IsUrl,
} from "class-validator";

export class CreateArtistDto {
  @ApiProperty({ example: "John Doe", type: String })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  artist_name: string;

  @ApiProperty({ example: ["Painter", "Sculptor"], type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  artist_medium: string[];

  @ApiProperty({ example: "Contemporary", type: String })
  @IsOptional()
  @IsString()
  artist_category: string;

  @ApiProperty({ example: "1990-01-01", type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  artist_dob: Date;

  @ApiProperty({ example: "2020-01-01", type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  died: Date;

  @ApiProperty({ example: "Art is life", type: String })
  @IsOptional()
  @IsString()
  artist_tag_line: string;

  @ApiProperty({ example: "Detailed biography...", type: String })
  @IsOptional()
  @IsString()
  artist_description: string;

  @ApiProperty({ example: "https://facebook.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  facebook_link: string;

  @ApiProperty({ example: "https://instagram.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  instagram_link: string;

  @ApiProperty({ example: "https://twitter.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  twitter_link: string;

  @ApiProperty({ example: "banner.jpg", type: String })
  @IsOptional()
  @IsString()
  banner_image: string;

  @ApiProperty({ example: "profile.jpg", type: String })
  @IsOptional()
  @IsString()
  artist_profile_image: string;

  @ApiProperty({ example: "Notable achievements", type: String })
  @IsOptional()
  @IsString()
  artist_highlight: string;

  @ApiProperty({ example: "India", type: String })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: "Contemporary Artist", type: String })
  @IsOptional()
  @IsString()
  profession: string;

  @ApiProperty({ example: "1", type: String })
  @IsOptional()
  @IsString()
  artist_status: string;
}