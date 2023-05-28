import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { MIN_YEAR } from '../../constants/constants';
@ValidatorConstraint({ name: 'checkDateOfJoining', async: false })
export class CheckDateOfJoining implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const dateParse = Date.parse(text)
    const year = new Date(dateParse).getFullYear()
    return dateParse >= Date.parse(MIN_YEAR) && year <= new Date().getFullYear();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args?.property} must be greater than 1970 and less than current date`;
  }
}
