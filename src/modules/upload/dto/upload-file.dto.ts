import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ description: 'file name' })
  @IsNotEmpty()
  @IsString()
  filename: string;

  @ApiProperty({ description: 'content type' })
  @IsString()
  @IsNotEmpty()
  content_type: string;
}
