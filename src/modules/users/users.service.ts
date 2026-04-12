import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { SearchingUserDto } from './dto';
import { PageDto, PageMetaDto } from '@common/dto/paginate.dto';
import { Users } from '@modules/databases/user.entity';
import { UpdateMyProfileDto, UserProfileDto } from './dto/user-profile.dto';
import { DeleteMyAccountDto } from './dto/delete-my-account.dto';
import { USER_STATUS } from '@common/enums';
import { ERROR_CODE } from '@constant/error-code';
import { TokenRepository } from '@modules/token/repository/token.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) { }

  // findUsingSocialId removed: social id columns were removed from Users entity.

  async findAll(query: SearchingUserDto) {
    const { page, limit } = query;
    const { entities, itemCount } = await this.userRepository.findAll(query);
    const pageMetaDto = new PageMetaDto({ itemCount, page, limit });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(user_id: number) {
    return this.userRepository.findOneById(user_id);
  }


  getMyProfile(user: Users): UserProfileDto {
    const { id, first_name, last_name, email, phone, date_of_birth, country, gender, password } = user as any;

    return {
      id,
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      country,
      gender,
      social_link: password ? false : true,
    };
  }

  async updateMyProfile(user: Users, body: UpdateMyProfileDto): Promise<UserProfileDto> {
    const { id: userId, email: currentEmail, password } = user;
    const { phone, email, date_of_birth: dateOfBirth, first_name: firstName, last_name: lastName, country, gender } = body as any;

    // firstname & lastname is required
    if (!firstName) delete body.first_name;
    if (!lastName) delete body.last_name;

    // only sso users can update their email
    const isSocialUser = password ? false : true;
    if (!isSocialUser || currentEmail) {
      delete body.email;
    }

    const updateResult = await this.userRepository.updateUserProfile(userId, body as any);
    const updatedUser: Users = updateResult.raw[0];

    return this.getMyProfile(updatedUser);
  }

  async deleteMyAccount(user: Users, body: DeleteMyAccountDto): Promise<{ user_id: number }> {
    const { id: userId, status } = user;
    const { reason } = body;

    if (status !== USER_STATUS.ACTIVE) {
      throw new BadRequestException(ERROR_CODE.A009);
    }

    // delete my account
    await this.userRepository.deleteMyAccount(userId, reason);

    // delete tokens
    await this.tokenRepository.destroyAllUserTokens(userId);

    return {
      user_id: userId,
    };
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
