import { Injectable } from '@nestjs/common';
import { GoogleCloudService } from '../../service/google-cloud.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class UploadsService {
  constructor(
    private readonly googleCloudService: GoogleCloudService,
  ) {}
  async uploadFileGGC(uploadFile: UploadFileDto) {
    const { filename, content_type } = uploadFile
    return await this.googleCloudService.generateV4SignedUrl(filename, content_type, true);
  }
}
