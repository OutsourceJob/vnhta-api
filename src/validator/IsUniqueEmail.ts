import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { AccountEntity } from 'src/modules/account/account.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueEmail implements ValidatorConstraintInterface {
  async validate(email: any, args: ValidationArguments) {
    const entityManager = getManager()
    return entityManager
      .findOne(AccountEntity, { email })
      .then(user => {
        if (user) return false;
        return true;
      });
  }
}
