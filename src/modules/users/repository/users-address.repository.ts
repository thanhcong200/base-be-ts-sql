import { BaseRepository } from '@common/repository/base-repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserAddress } from '@modules/databases/user-address.entity';
import { CreateUserAddressDto } from '../dto/create-user-address.dto';
import { getCountryDetail, getStateDetail } from '@common/utils';
import { SearchUserAddressDto } from '../dto/search-user-address.dto';

@Injectable()
export class UserAddressRepository extends BaseRepository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource);
  }

  async findByIdOrSaveUserAddress(user_address_id: number, user_address_dto: CreateUserAddressDto, user_id: number) {
    if (user_address_id) return this.findOneBy({ id: user_address_id });
    let validCountry, validState;
    const { country_iso, state_iso } = user_address_dto;
    if (country_iso) {
      validCountry = await getCountryDetail(country_iso);
    }
    if (state_iso) {
      validState = await getStateDetail(country_iso, state_iso);
    }

    return this.save({
      ...user_address_dto,
      state_code: user_address_dto.state_iso,
      country_code: user_address_dto.country_iso,
      phone_number: user_address_dto.phone,
      user_id,
      state: validState.name,
      country: validCountry.name,
      is_save: user_address_dto.is_save ? true : false,
    });
  }

  async findAll(query: SearchUserAddressDto) {
    const { user_id, sort, page, limit } = query;
    const userAddressQuery = this.createQueryBuilder('user_address')
      .innerJoin('user_address.user', 'user', 'user.id = :user_id', { user_id })
      .where('user_address.is_save = :isSave', { isSave: true })
      .select('user_address.id as id')
      .addSelect('user_address.first_name as first_name')
      .addSelect('user_address.last_name as last_name')
      .addSelect('user_address.address_line_1 as address_line_1')
      .addSelect('user_address.state as state')
      .addSelect('user_address.country as country')
      .addSelect('user_address.phone_number as phone_number')
      .addSelect('user_address.phone_code as phone_code')
      .addSelect('user_address.email as email')
      .addSelect('user_address.address_type as address_type')
      .addSelect('user_address.town_city as town_city')
      .addSelect('user_address.zip_code as zip_code')
      .addSelect('user_address.state_code as state_iso')
      .addSelect('user_address.country_code as country_iso')
      .addSelect('user_address.created_at as created_at');

    if (sort) {
      userAddressQuery.orderBy({ ...sort });
    }
    userAddressQuery.groupBy('user_address.id');
    const [entities, itemCount] = await Promise.all([
      userAddressQuery
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany(),
      userAddressQuery.getCount(),
    ]);
    return {
      entities,
      itemCount,
    };
  }
}
