import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductSchemaClass, ProductSchema } from "./infrastructure/persistence/document/entities/product.schema";
import { ProductRepository } from "./infrastructure/persistence/product.repository";
import { ProductsDocumentRepository } from "./infrastructure/persistence/document/repositories/product.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSchemaClass.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductRepository,
      useClass: ProductsDocumentRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}