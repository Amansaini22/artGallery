import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsArray, ArrayMinSize, IsDateString, IsUrl } from "class-validator";
import { Transform } from "class-transformer";


export class UpdateArtistDto {
  @ApiPropertyOptional({ example: "John Doe", type: String })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  artist_name: string;

  @ApiPropertyOptional({ example: ["Painter", "Sculptor"], type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  artist_medium: string[];

  @ApiPropertyOptional({ example: "Contemporary", type: String })
  @IsOptional()
  @IsString()
  artist_category: string;

  @ApiPropertyOptional({ example: "1990-01-01", type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  artist_dob: Date;

  @ApiPropertyOptional({ example: "2020-01-01", type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  died: Date;

  @ApiPropertyOptional({ example: "Art is life", type: String })
  @IsOptional()
  @IsString()
  artist_tag_line: string;

  @ApiPropertyOptional({ example: "Detailed biography...", type: String })
  @IsOptional()
  @IsString()
  artist_description: string;

  @ApiPropertyOptional({ example: "https://facebook.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  facebook_link: string;

  @ApiPropertyOptional({ example: "https://instagram.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  instagram_link: string;

  @ApiPropertyOptional({ example: "https://twitter.com/artist", type: String })
  @IsOptional()
  @IsUrl()
  twitter_link: string;

  @ApiPropertyOptional({ example: "banner.jpg", type: String })
  @IsOptional()
  @IsString()
  banner_image: string;

  @ApiPropertyOptional({ example: "profile.jpg", type: String })
  @IsOptional()
  @IsString()
  artist_profile_image: string;

  @ApiPropertyOptional({ example: "Notable achievements", type: String })
  @IsOptional()
  @IsString()
  artist_highlight: string;

  @ApiPropertyOptional({ example: "India", type: String })
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: "Contemporary Artist", type: String })
  @IsOptional()
  @IsString()
  profession: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  artist_status: string;
}