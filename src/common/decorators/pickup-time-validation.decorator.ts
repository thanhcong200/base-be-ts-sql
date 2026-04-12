import { verifyShipmentPickUpTime } from '@common/utils';
import { INVALID_PICKUP_TIME_ERROR } from '@constant/error-messages';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidPickUpTime', async: true })
@Injectable()
export class ValidPickUpTimeConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    return this.verifyPickUpTime(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return INVALID_PICKUP_TIME_ERROR;
  }

  private verifyPickUpTime(value: string): boolean {
    return verifyShipmentPickUpTime(value);
  }
}

export const IsValidPickUpTime = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidPickUpTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidPickUpTimeConstraint,
    });
  };
};
