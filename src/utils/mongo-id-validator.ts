import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException({
        errors: {
          id: `The provided value is not a valid MongoDB ObjectId: ${value}`,
        },
      });
    }
    return value;
  }
}
