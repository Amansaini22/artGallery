import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ArtistDto {
  @ApiProperty({
    type: String,
    example: "60ad0eadb18e2e6d8c8a3f50",
  })
  @IsNotEmpty()
  id: string | number;
}
