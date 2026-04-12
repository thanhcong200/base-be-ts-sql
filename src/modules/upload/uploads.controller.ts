import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GoogleCloudService } from '../../service/google-cloud.service';
import { BearerGuard } from '@common/guards';
import { IsAdminGuard } from '@common/guards/is-admin.guard';

@ApiTags('Uploads')
@Controller('v1/uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly googleCloudService: GoogleCloudService,
  ) { }

  @Post('/upload-google')
  @ApiOperation({ summary: 'Get presigned URL for upload post image' })
  async getSignedUrlForUpload(@Body() uploadFile: UploadFileDto): Promise<any> {
    return await this.uploadsService.uploadFileGGC(uploadFile);
  }

  @Post()
  @UseGuards(BearerGuard, IsAdminGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(jpg|png|jpeg|svg)' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.googleCloudService.uploadFiles(files);
  }
}
