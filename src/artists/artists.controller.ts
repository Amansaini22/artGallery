import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiParam } from "@nestjs/swagger";
import { Artist } from "./domain/artist";
import { ArtistsService } from "./artists.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { QueryArtistDto } from "./dto/query-artist.dto";
import { InfinityPaginationResponseDto } from "../utils/dto/infinity-pagination-response.dto";
import { infinityPagination } from "../utils/infinity-pagination";
import { MongoIdValidationPipe } from "@src/utils/mongo-id-validator";

@ApiTags("Artists")
@Controller({
  path: "artists",
  version: "1",
})
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Artist })
  async create(@Body() createArtistDto: CreateArtistDto): Promise<{ message: string; data: Artist }> {
    const artist = await this.artistsService.create(createArtistDto);
    return {
      message: "Artist created successfully",
      data: artist,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponseDto })
  async findAll(
    @Query() query: QueryArtistDto,
  ): Promise<{ message: string; data: InfinityPaginationResponseDto<Artist> }> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const artists = await infinityPagination(
      await this.artistsService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );

    return {
      message: "Artists fetched successfully",
      data: artists,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Artist })
  @ApiParam({ name: "id", type: String })
  async findOne(
    @Param("id", MongoIdValidationPipe) id: string,
  ): Promise<{ message: string; data: Artist }> {
    const artist = await this.artistsService.findById(id);
    if (!artist) {
      throw new NotFoundException({
        errors: { artist: `Artist with ID ${id} not found` },
      });
    }
    return {
      message: "Artist fetched successfully",
      data: artist,
    };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Artist })
  @ApiParam({ name: "id", type: String })
  async update(
    @Param("id", MongoIdValidationPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<{ message: string; data: Artist }> {
    const artist = await this.artistsService.update(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException({
        errors: { artist: `Artist with ID ${id} not found` },
      });
    }
    return {
      message: "Artist updated successfully",
      data: artist,
    };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  async remove(@Param("id", MongoIdValidationPipe) id: string): Promise<{ message: string }> {
    const artist = await this.artistsService.findById(id);
    if (!artist) {
      throw new NotFoundException({
        errors: { artist: `Artist with ID ${id} not found` },
      });
    }
    await this.artistsService.remove(id);
    return {
      message: `Artist with id ${id} deleted successfully`,
    };
  }
}