import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsUrl,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  categories_id: string;

  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  medium_id: string;

  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  styles_id: string;

  @ApiProperty({ example: "1", type: String })
  @IsOptional()
  @IsString()
  techniques_id?: string;

  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  surface_id: string;

  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  artist_id: string;

  @ApiProperty({ example: "Untitled", type: String })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  product_name: string;

  @ApiProperty({ example: "SKU-001", type: String })
  @IsNotEmpty()
  @IsString()
  product_sku_id: string;

  @ApiProperty({ example: 100000.00, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  product_regular_price?: number;

  @ApiProperty({ example: 90000.00, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  product_offer_price?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  product_description?: string;

  @ApiProperty({ example: "1", type: String })
  @IsNotEmpty()
  @IsString()
  orientation: string;

  @ApiProperty({ example: "24x36", type: String })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({ example: 24, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  height: number;

  @ApiProperty({ example: 36, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  width: number;

  @ApiProperty({ example: 2, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  depth?: number;

  @ApiProperty({ example: "inch", type: String })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ example: "2020", type: String })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ example: "Oil on Canvas", type: String })
  @IsNotEmpty()
  @IsString()
  printing: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  colour?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  product_image: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  product_wall?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  certificate1?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  certificate2?: string;

  @ApiProperty({ example: "1", type: String })
  @IsOptional()
  @IsString()
  product_status?: string;
}