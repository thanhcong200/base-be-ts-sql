import { SortType } from '@common/enums';
import { i18nMsg, toSnakeKey } from '@common/utils';
import { BadRequestException, ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type SortParams = {
  sort_field: string;
  sort_order: SortType.ASC | SortType.DESC;
};

export type SortInputParams = {
  allowedFields?: string[];
  sort_field?: string;
  sort_order?: string;
  default?: {
    sort_field?: string;
    sort_order?: string;
  };
};

const sortType = [SortType.DESC, SortType.ASC];
export function Sort(sortParams: SortInputParams) {
  return (target, key, descriptor) => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(target, key);
    if (propertyDescriptor) {
      ApiQuery({
        name: 'sort_field',
        enum: sortParams.allowedFields || [],
        schema: {
          default: sortParams.default?.sort_field || 'id',
          type: 'string',
        },
        required: false,
      })(target, key, propertyDescriptor);

      ApiQuery({
        name: 'sort_order',
        schema: {
          default: sortParams.default?.sort_order || SortType.DESC,
          type: 'string',
        },
        enum: sortType,
        required: false,
      })(target, key, propertyDescriptor);
    }

    return sortDecorator(sortParams)(target, key, descriptor);
  };
}

const sortDecorator = createParamDecorator((sortInput: any, ctx: ExecutionContext) => {
  const sortParams = { sort_field: 'sort_field', sort_order: 'sort_order', ...sortInput };

  if (!sortParams.sort_field) sortParams.sort_field = 'sort_field';
  if (!sortParams.sort_order) sortParams.sort_order = 'sort_order';

  const request = ctx.switchToHttp().getRequest();
  const sort_field: any = toSnakeKey(request.query[sortParams.sort_field] || sortParams.default?.sort_field || 'id');
  const sort_order = (
    request.query[sortParams.sort_order] ||
    sortParams.default?.sort_order ||
    SortType.DESC
  ).toUpperCase();

  if (!sortParams.allowedFields || (sort_field !== 'id' && !sortParams.allowedFields.includes(sort_field))) {
    throw new BadRequestException({
      message: i18nMsg('$property must be one of the following values:$constraint1', {
        property: sortParams.sort_field,
        constraint1: sortParams.allowedFields,
      }),
      validation: true,
    });
  }

  if (!sortType.includes(sort_order)) {
    throw new BadRequestException({
      message: i18nMsg('$property must be one of the following values:$constraint1', {
        property: sortParams.sort_order,
        constraint1: sortType,
      }),
      validation: true,
    });
  }
  return {
    sort_field,
    sort_order,
  };
});
