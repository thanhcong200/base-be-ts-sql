import { StatusOptionalDto } from '@common/dto';
import { RoleRefOptionalDto, SearchDto } from '@common/dto/common.dto';
import { IntersectionType } from '@nestjs/swagger';

export class ListAdminDto extends IntersectionType(RoleRefOptionalDto, StatusOptionalDto, SearchDto) {}
