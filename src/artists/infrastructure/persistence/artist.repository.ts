import { Artist } from "../../domain/artist";
import { FilterArtistDto, SortArtistDto } from "../../dto/query-artist.dto";
import { NullableType } from "../../../utils/types/nullable.type";
import { IPaginationOptions } from "../../../utils/types/pagination-options";

export abstract class ArtistRepository {
  abstract create(
    data: Omit<Artist, "id" | "createdAt" | "deletedAt" | "updatedAt">,
  ): Promise<Artist>;
  
  abstract findManyWithPagination(params: {
    filterOptions?: FilterArtistDto | null;
    sortOptions?: SortArtistDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Artist[]>;
  
  abstract findById(id: Artist["id"]): Promise<NullableType<Artist>>;
  
  abstract findByName(name: string): Promise<NullableType<Artist>>;
  
  abstract update(
    id: Artist["id"],
    payload: Partial<Artist>,
  ): Promise<NullableType<Artist>>;
  
  abstract remove(id: Artist["id"]): Promise<void>;
}