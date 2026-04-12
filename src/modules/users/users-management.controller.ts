import { BearerGuard } from '@common/guards';
import { IsAdminGuard } from '@common/guards/is-admin.guard';
import { AuthService } from '@modules/auth/auth.service';
import { UsersService } from '@modules/users/users.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SearchingUserDto } from './dto';

@Controller('v1/users-management')
@ApiTags('users management')
@ApiBearerAuth()
@ApiBasicAuth()
export class UsersManagementController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @ApiBody({
    description: 'get list customer',
    type: SearchingUserDto,
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(BearerGuard, IsAdminGuard)
  async findAll(@Query() body: SearchingUserDto) {
    return this.usersService.findAll(body);
  }

  @ApiBody({
    description: 'customer detail',
    type: SearchingUserDto,
  })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(BearerGuard, IsAdminGuard)
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
