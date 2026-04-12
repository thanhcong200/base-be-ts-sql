import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, IsOptional } from "class-validator";

export class AppleLoginDto {
    @ApiProperty({ required: true, example: 'ABC' })
    @IsString()
    @IsNotEmpty()
    public token: string;

    @ApiProperty({ required: false, example: 'ABC' })
    @IsString()
    @IsOptional()
    public first_name: string;

    @ApiProperty({ required: false, example: 'ABC' })
    @IsString()
    @IsOptional()
    public last_name: string;
} 

export class GoogleLoginDto extends AppleLoginDto {}

export class FacebookLoginDto {
    @ApiProperty({ required: true, example: 'ABC' })
    @IsString()
    @IsNotEmpty()
    public token: string;
}