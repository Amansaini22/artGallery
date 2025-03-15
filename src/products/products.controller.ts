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
  UnprocessableEntityException,
} from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiParam } from "@nestjs/swagger";
import { Product } from "./domain/product";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { QueryProductDto } from "./dto/query-product.dto";
import { InfinityPaginationResponseDto } from "../utils/dto/infinity-pagination-response.dto";
import { infinityPagination } from "../utils/infinity-pagination";
import { MongoIdValidationPipe } from "@src/utils/mongo-id-validator";

@ApiTags("Products")
@Controller({
  path: "products",
  version: "1",
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductDto: CreateProductDto): Promise<{ message: string; data: Product }> {
    const product = await this.productsService.create(createProductDto);
    return {
      message: "Product created successfully",
      data: product,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponseDto })
  async findAll(
    @Query() query: QueryProductDto,
  ): Promise<{ message: string; data: InfinityPaginationResponseDto<Product> }> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const products = await infinityPagination(
      await this.productsService.findManyWithPagination({
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
      message: "Products fetched successfully",
      data: products,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Product })
  @ApiParam({ name: "id", type: String })
  async findOne(
    @Param("id", MongoIdValidationPipe) id: string,
  ): Promise<{ message: string; data: Product }> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException({
        errors: { product: `Product with ID ${id} not found` },
      });
    }
    return {
      message: "Product fetched successfully",
      data: product,
    };
  }

  @Get("sku/:skuId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Product })
  @ApiParam({ name: "skuId", type: String })
  async findBySkuId(
    @Param("skuId") skuId: string,
  ): Promise<{ message: string; data: Product }> {
    const product = await this.productsService.findBySkuId(skuId);
    if (!product) {
      throw new NotFoundException({
        errors: { product: `Product with SKU ${skuId} not found` },
      });
    }
    return {
      message: "Product fetched successfully",
      data: product,
    };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Product })
  @ApiParam({ name: "id", type: String })
  async update(
    @Param("id", MongoIdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const product = await this.productsService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException({
        errors: { product: `Product with ID ${id} not found` },
      });
    }
    return {
      message: "Product updated successfully",
      data: product,
    };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  async remove(
    @Param("id", MongoIdValidationPipe) id: string,
  ): Promise<{ message: string }> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException({
        errors: { product: `Product with ID ${id} not found` },
      });
    }
    await this.productsService.remove(id);
    return {
      message: `Product with id ${id} deleted successfully`,
    };
  }
}