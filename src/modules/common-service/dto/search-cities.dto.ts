import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchCitiesDto {
    @ApiProperty({ example: 'US'})
    @IsString()
    country_code: string;

    @ApiProperty({ example: 'TX'})
    @IsString()
    state_code: string;
}