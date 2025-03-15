import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./domain/product";
import { ProductRepository } from "./infrastructure/persistence/product.repository";
import { FilterProductDto, SortProductDto } from "./dto/query-product.dto";
import { NullableType } from "../utils/types/nullable.type";
import { IPaginationOptions } from "../utils/types/pagination-options";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if product with same SKU exists
    const existingProduct = await this.productsRepository.findBySkuId(createProductDto.product_sku_id);
    if (existingProduct) {
      throw new UnprocessableEntityException({
        errors: { product_sku_id: "Product with this SKU already exists" },
      });
    }

    return this.productsRepository.create(createProductDto as Product);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    return this.productsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Product["id"]): Promise<NullableType<Product>> {
    return this.productsRepository.findById(id);
  }

  findBySkuId(skuId: string): Promise<NullableType<Product>> {
    return this.productsRepository.findBySkuId(skuId);
  }

  async update(id: Product["id"], updateProductDto: UpdateProductDto): Promise<Product | null> {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      return null;
    }

    // Check if new SKU conflicts with another product
    if (updateProductDto.product_sku_id && updateProductDto.product_sku_id !== existingProduct.product_sku_id) {
      const productWithSku = await this.productsRepository.findBySkuId(updateProductDto.product_sku_id);
      if (productWithSku && productWithSku.id !== id) {
        throw new UnprocessableEntityException({
          errors: { product_sku_id: "Product with this SKU already exists" },
        });
      }
    }

    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: Product["id"]): Promise<void> {
    await this.productsRepository.remove(id);
  }
}