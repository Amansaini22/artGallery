import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { NullableType } from "../../../../../utils/types/nullable.type";
import { FilterProductDto, SortProductDto } from "../../../../dto/query-product.dto";
import { Product } from "../../../../domain/product";
import { ProductRepository } from "../../product.repository";
import { ProductSchemaClass } from "../entities/product.schema";
import { ProductMapper } from "../mappers/product.mapper";
import { IPaginationOptions } from "../../../../../utils/types/pagination-options";

@Injectable()
export class ProductsDocumentRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductSchemaClass.name)
    private readonly productsModel: Model<ProductSchemaClass>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const createdProduct = new this.productsModel(persistenceModel);
    const productObject = await createdProduct.save();
    return ProductMapper.toDomain(productObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const where: FilterQuery<ProductSchemaClass> = {};

    if (filterOptions?.product_name) {
      where.product_name = new RegExp(filterOptions.product_name, 'i');
    }

    if (filterOptions?.product_sku_id) {
      where.product_sku_id = filterOptions.product_sku_id;
    }

    if (filterOptions?.artist_id) {
      where.artist_id = filterOptions.artist_id;
    }

    if (filterOptions?.categories_id) {
      where.categories_id = filterOptions.categories_id;
    }

    if (filterOptions?.medium_id) {
      where.medium_id = filterOptions.medium_id;
    }

    if (filterOptions?.styles_id) {
      where.styles_id = filterOptions.styles_id;
    }

    if (filterOptions?.surface_id) {
      where.surface_id = filterOptions.surface_id;
    }

    if (filterOptions?.year?.length) {
      where.year = { $in: filterOptions.year };
    }

    if (filterOptions?.printing) {
      where.printing = filterOptions.printing;
    }

    where.product_status = filterOptions?.product_status || { $ne: "0" };

    const productObjects = await this.productsModel
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

    return productObjects.map((productObject) => ProductMapper.toDomain(productObject));
  }

  async findById(id: Product["id"]): Promise<NullableType<Product>> {
    const productObject = await this.productsModel.findOne({
      _id: id,
      product_status: { $ne: "0" },
    });
    return productObject ? ProductMapper.toDomain(productObject) : null;
  }

  async findBySkuId(skuId: string): Promise<NullableType<Product>> {
    const productObject = await this.productsModel.findOne({
      product_sku_id: skuId,
      product_status: { $ne: "0" },
    });
    return productObject ? ProductMapper.toDomain(productObject) : null;
  }

  async update(id: Product["id"], payload: Partial<Product>): Promise<Product | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString(), product_status: { $ne: "0" } };
    const product = await this.productsModel.findOne(filter);

    if (!product) {
      return null;
    }

    const productObject = await this.productsModel.findOneAndUpdate(
      filter,
      ProductMapper.toPersistence({
        ...ProductMapper.toDomain(product),
        ...clonedPayload,
      }),
      { new: true },
    );

    return productObject ? ProductMapper.toDomain(productObject) : null;
  }

  async remove(id: Product["id"]): Promise<void> {
    await this.productsModel.findOneAndUpdate(
      { _id: id.toString() },
      { product_status: "0" }
    );
  }
}