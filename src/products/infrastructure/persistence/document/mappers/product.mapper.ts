import { Product } from "@src/products/domain/product";
import { ProductSchemaClass } from "../entities/product.schema";

export class ProductMapper {
  static toDomain(raw: ProductSchemaClass): Product {
    const domainEntity = new Product();
    domainEntity.id = raw._id.toString();
    domainEntity.categories_id = raw.categories_id;
    domainEntity.medium_id = raw.medium_id;
    domainEntity.styles_id = raw.styles_id;
    domainEntity.techniques_id = raw.techniques_id;
    domainEntity.surface_id = raw.surface_id;
    domainEntity.artist_id = raw.artist_id;
    domainEntity.product_name = raw.product_name;
    domainEntity.product_sku_id = raw.product_sku_id;
    domainEntity.product_regular_price = raw.product_regular_price;
    domainEntity.product_offer_price = raw.product_offer_price;
    domainEntity.product_description = raw.product_description;
    domainEntity.orientation = raw.orientation;
    domainEntity.size = raw.size;
    domainEntity.height = raw.height;
    domainEntity.width = raw.width;
    domainEntity.depth = raw.depth;
    domainEntity.unit = raw.unit;
    domainEntity.year = raw.year;
    domainEntity.printing = raw.printing;
    domainEntity.colour = raw.colour;
    domainEntity.product_image = raw.product_image;
    domainEntity.product_wall = raw.product_wall;
    domainEntity.certificate1 = raw.certificate1;
    domainEntity.certificate2 = raw.certificate2;
    domainEntity.product_status = raw.product_status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductSchemaClass {
    const persistenceEntity = new ProductSchemaClass();

    if (domainEntity.id && typeof domainEntity.id === "string") {
      persistenceEntity._id = domainEntity.id;
    }

    persistenceEntity.categories_id = domainEntity.categories_id;
    persistenceEntity.medium_id = domainEntity.medium_id;
    persistenceEntity.styles_id = domainEntity.styles_id;
    persistenceEntity.techniques_id = domainEntity.techniques_id;
    persistenceEntity.surface_id = domainEntity.surface_id;
    persistenceEntity.artist_id = domainEntity.artist_id;
    persistenceEntity.product_name = domainEntity.product_name;
    persistenceEntity.product_sku_id = domainEntity.product_sku_id;
    persistenceEntity.product_regular_price = domainEntity.product_regular_price;
    persistenceEntity.product_offer_price = domainEntity.product_offer_price;
    persistenceEntity.product_description = domainEntity.product_description;
    persistenceEntity.orientation = domainEntity.orientation;
    persistenceEntity.size = domainEntity.size;
    persistenceEntity.height = domainEntity.height;
    persistenceEntity.width = domainEntity.width;
    persistenceEntity.depth = domainEntity.depth;
    persistenceEntity.unit = domainEntity.unit;
    persistenceEntity.year = domainEntity.year;
    persistenceEntity.printing = domainEntity.printing;
    persistenceEntity.colour = domainEntity.colour;
    persistenceEntity.product_image = domainEntity.product_image;
    persistenceEntity.product_wall = domainEntity.product_wall;
    persistenceEntity.certificate1 = domainEntity.certificate1;
    persistenceEntity.certificate2 = domainEntity.certificate2;
    persistenceEntity.product_status = domainEntity.product_status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}