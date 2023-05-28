import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { MIN_YEAR } from '../../constants/constants';
@ValidatorConstraint({ name: 'isDateLessThanNow', async: false })
export class IsDateLessThanNow implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const dateParse = Date.parse(text)
    return dateParse >= Date.parse(MIN_YEAR) && dateParse < (new Date()).getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args?.property} must be greater than 1970 and less than current date`;
  }
}
