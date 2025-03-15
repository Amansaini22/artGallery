import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsArray,
  IsDateString,
} from "class-validator";
import { plainToInstance, Transform, Type } from "class-transformer";
import { Artist } from "../domain/artist";

export class FilterArtistDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_name?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  artist_medium?: string[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_category?: string;

  @ApiPropertyOptional({ type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  artist_dob?: Date;

  @ApiPropertyOptional({ type: String, format: "date" })
  @IsOptional()
  @IsDateString()
  died?: Date;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_tag_line?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_description?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  facebook_link?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  instagram_link?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  twitter_link?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  banner_image?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_profile_image?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_highlight?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_status?: string;
}

export class SortArtistDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Artist;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryArtistDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterArtistDto, JSON.parse(value)) : undefined
  )
  @ValidateNested()
  @Type(() => FilterArtistDto)
  filters?: FilterArtistDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortArtistDto, JSON.parse(value)) : undefined
  )
  @ValidateNested({ each: true })
  @Type(() => SortArtistDto)
  sort?: SortArtistDto[] | null;
}