import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";

import { NullableType } from "../../../../../utils/types/nullable.type";
import { FilterArtistDto, SortArtistDto } from "../../../../dto/query-artist.dto";
import { Artist } from "../../../../domain/artist";
import { ArtistRepository } from "../../artist.repository";
import { ArtistSchemaClass } from "../entities/artist.schema";
import { ArtistMapper } from "../mappers/artist.mapper";
import { IPaginationOptions } from "../../../../../utils/types/pagination-options";

@Injectable()
export class ArtistsDocumentRepository implements ArtistRepository {
  constructor(
    @InjectModel(ArtistSchemaClass.name)
    private readonly artistsModel: Model<ArtistSchemaClass>,
  ) {}

  async create(data: Artist): Promise<Artist> {
    const persistenceModel = ArtistMapper.toPersistence(data);
    const createdArtist = new this.artistsModel(persistenceModel);
    const artistObject = await createdArtist.save();
    return ArtistMapper.toDomain(artistObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterArtistDto | null;
    sortOptions?: SortArtistDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Artist[]> {
    const where: FilterQuery<ArtistSchemaClass> = {};

    if (filterOptions?.artist_name) {
      where.artist_name = new RegExp(filterOptions.artist_name, 'i');
    }

    if (filterOptions?.artist_medium?.length) {
      where.artist_medium = { $in: filterOptions.artist_medium };
    }

    if (filterOptions?.country) {
      where.country = filterOptions.country;
    }

    if (filterOptions?.profession) {
      where.profession = filterOptions.profession;
    }

    where.artist_status = { $ne: "0" };

    const artistObjects = await this.artistsModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === "id" ? "_id" : sort.orderBy]:
              sort.order.toUpperCase() === "ASC" ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return artistObjects.map((artistObject) => ArtistMapper.toDomain(artistObject));
  }

  async findById(id: Artist["id"]): Promise<NullableType<Artist>> {
    const artistObject = await this.artistsModel.findOne({
      _id: id,
      artist_status: { $ne: "0" },
    });
    return artistObject ? ArtistMapper.toDomain(artistObject) : null;
  }

  async findByName(name: string): Promise<NullableType<Artist>> {
    const artistObject = await this.artistsModel.findOne({
      artist_name: name,
      artist_status: { $ne: "0" },
    });
    return artistObject ? ArtistMapper.toDomain(artistObject) : null;
  }

  async update(id: Artist["id"], payload: Partial<Artist>): Promise<Artist | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString(), artist_status: { $ne: "0" } };
    const artist = await this.artistsModel.findOne(filter);

    if (!artist) {
      return null;
    }

    const artistObject = await this.artistsModel.findOneAndUpdate(
      filter,
      ArtistMapper.toPersistence({
        ...ArtistMapper.toDomain(artist),
        ...clonedPayload,
      }),
      { new: true },
    );

    return artistObject ? ArtistMapper.toDomain(artistObject) : null;
  }

  async remove(id: Artist["id"]): Promise<void> {
    await this.artistsModel.findOneAndUpdate(
      { _id: id.toString() },
      { artist_status: "0" }
    );
  }
}