import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { EntityDocumentHelper } from "../../../../../utils/document-entity-helper";

export type ArtistSchemaDocument = HydratedDocument<ArtistSchemaClass>;

@Schema({
  collection: "artists",
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ArtistSchemaClass extends EntityDocumentHelper {
  @ApiProperty({ example: "John Doe", type: String })
  @Prop({ type: String, required: true })
  artist_name: string;

  @ApiProperty({ example: ["Painter", "Sculptor"], type: [String] })
  @Prop({ type: [String], required: true })
  artist_medium: string[];

  @ApiProperty({ example: "Contemporary", type: String })
  @Prop({ type: String })
  artist_category: string;

  @ApiProperty({ example: "1990-01-01", type: String, format: "date" })
  @Prop({ type: Date })
  artist_dob: Date;

  @ApiProperty({ example: "2020-01-01", type: String, format: "date" })
  @Prop({ type: Date })
  died: Date;

  @ApiProperty({ example: "Art is life", type: String })
  @Prop({ type: String })
  artist_tag_line: string;

  @ApiProperty({ example: "Detailed biography of the artist...", type: String })
  @Prop({ type: String })
  artist_description: string;

  @ApiProperty({ example: "https://facebook.com/artist", type: String })
  @Prop({ type: String })
  facebook_link: string;

  @ApiProperty({ example: "https://instagram.com/artist", type: String })
  @Prop({ type: String })
  instagram_link: string;

  @ApiProperty({ example: "https://twitter.com/artist", type: String })
  @Prop({ type: String })
  twitter_link: string;

  @ApiProperty({ example: "banner.jpg", type: String })
  @Prop({ type: String })
  banner_image: string;

  @ApiProperty({ example: "profile.jpg", type: String })
  @Prop({ type: String })
  artist_profile_image: string;

  @ApiProperty({ example: "Notable achievements and highlights", type: String })
  @Prop({ type: String })
  artist_highlight: string;

  @ApiProperty({ example: "India", type: String })
  @Prop({ type: String, required: true })
  country: string;

  @ApiProperty({ example: "Contemporary Artist", type: String })
  @Prop({ type: String })
  profession: string;

  @ApiProperty({ example: "1", type: String })
  @Prop({ type: String, default: "1" })
  artist_status: string;

  @ApiProperty({ default: now })
  @Prop({ default: now })
  createdAt: Date;

  @ApiProperty({ default: now })
  @Prop({ default: now })
  updatedAt: Date;
}

const ArtistSchema = SchemaFactory.createForClass(ArtistSchemaClass);

ArtistSchema.index({ artist_name: 1 });
ArtistSchema.index({ country: 1 });
ArtistSchema.index({ artist_medium: 1 });

export { ArtistSchema };