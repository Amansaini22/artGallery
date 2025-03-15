import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { EntityDocumentHelper } from "../../../../../utils/document-entity-helper";

export type ProductSchemaDocument = HydratedDocument<ProductSchemaClass>;

@Schema({
  collection: "products",
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ProductSchemaClass extends EntityDocumentHelper {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  categories_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  medium_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  styles_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  techniques_id?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  surface_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  artist_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  product_name: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true, unique: true })
  product_sku_id: string;

  @ApiProperty({ type: Number })
  @Prop({ type: Number })
  product_regular_price?: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number })
  product_offer_price?: number;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  product_description?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  orientation: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  size: string;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true })
  height: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true })
  width: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number })
  depth?: number;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  unit: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  year?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  printing: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  colour?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  product_image: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  product_wall?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  certificate1?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String })
  certificate2?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, default: "1" })
  product_status: string;

  @ApiProperty({ default: now })
  @Prop({ default: now })
  createdAt: Date;

  @ApiProperty({ default: now })
  @Prop({ default: now })
  updatedAt: Date;
}

const ProductSchema = SchemaFactory.createForClass(ProductSchemaClass);

ProductSchema.index({ product_sku_id: 1 }, { unique: true });
ProductSchema.index({ artist_id: 1 });
ProductSchema.index({ categories_id: 1 });
ProductSchema.index({ medium_id: 1 });
ProductSchema.index({ styles_id: 1 });
ProductSchema.index({ surface_id: 1 });

export { ProductSchema };