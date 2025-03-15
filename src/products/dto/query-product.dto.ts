import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { Product } from "../domain/product";

export class FilterProductDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_sku_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  artist_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  categories_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  medium_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  styles_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  surface_id?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  year?: string[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  printing?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_status?: string;
}

export class SortProductDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Product;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryProductDto {
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
    value ? JSON.parse(value) : undefined
  )
  @ValidateNested()
  @Type(() => FilterProductDto)
  filters?: FilterProductDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? JSON.parse(value) : undefined
  )
  @ValidateNested({ each: true })
  @Type(() => SortProductDto)
  sort?: SortProductDto[] | null;
}