import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { Artist } from "./domain/artist";
import { ArtistRepository } from "./infrastructure/persistence/artist.repository";
import { FilterArtistDto, SortArtistDto } from "./dto/query-artist.dto";
import { NullableType } from "../utils/types/nullable.type";
import { IPaginationOptions } from "../utils/types/pagination-options";

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    // Check if artist with same name exists
    const existingArtist = await this.artistsRepository.findByName(createArtistDto.artist_name);
    if (existingArtist) {
      throw new UnprocessableEntityException({
        errors: { artist_name: "Artist with this name already exists" },
      });
    }

    return this.artistsRepository.create(createArtistDto);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterArtistDto | null;
    sortOptions?: SortArtistDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Artist[]> {
    return this.artistsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Artist["id"]): Promise<NullableType<Artist>> {
    return this.artistsRepository.findById(id);
  }

  async update(id: Artist["id"], updateArtistDto: UpdateArtistDto): Promise<Artist | null> {
    const existingArtist = await this.artistsRepository.findById(id);
    if (!existingArtist) {
      return null;
    }

    // Check if new name conflicts with another artist
    if (updateArtistDto.artist_name && updateArtistDto.artist_name !== existingArtist.artist_name) {
      const artistWithName = await this.artistsRepository.findByName(updateArtistDto.artist_name);
      if (artistWithName && artistWithName.id !== id) {
        throw new UnprocessableEntityException({
          errors: { artist_name: "Artist with this name already exists" },
        });
      }
    }

    return this.artistsRepository.update(id, updateArtistDto);
  }

  async remove(id: Artist["id"]): Promise<void> {
    await this.artistsRepository.remove(id);
  }
}