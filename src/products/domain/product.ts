import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import databaseConfig from "../../database/config/database.config";
import { DatabaseConfig } from "../../database/config/database-config.type";

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Product {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  categories_id: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  medium_id: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  styles_id: string;

  @ApiPropertyOptional({
    type: String,
    example: "1",
  })
  techniques_id?: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  surface_id: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  artist_id: string;

  @ApiProperty({
    type: String,
    example: "Untitled",
  })
  product_name: string;

  @ApiProperty({
    type: String,
    example: "SKU-001",
  })
  product_sku_id: string;

  @ApiPropertyOptional({
    type: Number,
    example: 100000.00,
  })
  product_regular_price?: number;

  @ApiPropertyOptional({
    type: Number,
    example: 90000.00,
  })
  product_offer_price?: number;

  @ApiPropertyOptional({
    type: String,
  })
  product_description?: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  orientation: string;

  @ApiProperty({
    type: String,
    example: "24x36",
  })
  size: string;

  @ApiProperty({
    type: Number,
    example: 24,
  })
  height: number;

  @ApiProperty({
    type: Number,
    example: 36,
  })
  width: number;

  @ApiPropertyOptional({
    type: Number,
    example: 2,
  })
  depth?: number;

  @ApiProperty({
    type: String,
    example: "inch",
  })
  unit: string;

  @ApiPropertyOptional({
    type: String,
    example: "2020",
  })
  year?: string;

  @ApiProperty({
    type: String,
    example: "Oil on Canvas",
  })
  printing: string;

  @ApiPropertyOptional({
    type: String,
  })
  colour?: string;

  @ApiProperty({
    type: String,
  })
  product_image: string;

  @ApiPropertyOptional({
    type: String,
  })
  product_wall?: string;

  @ApiPropertyOptional({
    type: String,
  })
  certificate1?: string;

  @ApiPropertyOptional({
    type: String,
  })
  certificate2?: string;

  @ApiProperty({
    type: String,
    example: "1",
  })
  product_status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}