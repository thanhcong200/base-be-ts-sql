import { Controller } from '@nestjs/common';
import { CommonServiceService } from './common-service.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common Service')
@Controller('v1/common-service')
export class CommonServiceController {
  constructor(private readonly commonServiceService: CommonServiceService) { }

}
