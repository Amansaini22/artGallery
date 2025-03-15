import { Product } from "../../domain/product";
import { FilterProductDto, SortProductDto } from "../../dto/query-product.dto";
import { NullableType } from "../../../utils/types/nullable.type";
import { IPaginationOptions } from "../../../utils/types/pagination-options";

export abstract class ProductRepository {
  abstract create(data: Product): Promise<Product>;
  
  abstract findManyWithPagination(params: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]>;
  
  abstract findById(id: Product["id"]): Promise<NullableType<Product>>;
  
  abstract findBySkuId(skuId: string): Promise<NullableType<Product>>;
  
  abstract update(
    id: Product["id"],
    payload: Partial<Product>,
  ): Promise<NullableType<Product>>;
  
  abstract remove(id: Product["id"]): Promise<void>;
}