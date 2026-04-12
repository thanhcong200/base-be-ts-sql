import { IsString } from "class-validator";

export class FacebookPayloadDto {
    @IsString()
    id: string;

    @IsString()
    email: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;
}