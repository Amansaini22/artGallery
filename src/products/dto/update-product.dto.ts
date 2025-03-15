import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  categories_id: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  medium_id: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  styles_id: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  techniques_id?: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  surface_id: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  artist_id: string;

  @ApiPropertyOptional({ example: "Untitled", type: String })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  product_name: string;

  @ApiPropertyOptional({ example: "SKU-001", type: String })
  @IsOptional()
  @IsString()
  product_sku_id: string;

  @ApiPropertyOptional({ example: 100000.00, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  product_regular_price?: number;

  @ApiPropertyOptional({ example: 90000.00, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  product_offer_price?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_description?: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  orientation: string;

  @ApiPropertyOptional({ example: "24x36", type: String })
  @IsOptional()
  @IsString()
  size: string;

  @ApiPropertyOptional({ example: 24, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height: number;

  @ApiPropertyOptional({ example: 36, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  width: number;

  @ApiPropertyOptional({ example: 2, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  depth?: number;

  @ApiPropertyOptional({ example: "inch", type: String })
  @IsOptional()
  @IsString()
  unit: string;

  @ApiPropertyOptional({ example: "2020", type: String })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiPropertyOptional({ example: "Oil on Canvas", type: String })
  @IsOptional()
  @IsString()
  printing: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  colour?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_image: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  product_wall?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  certificate1?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  certificate2?: string;

  @ApiPropertyOptional({ example: "1", type: String })
  @IsOptional()
  @IsString()
  product_status?: string;
}