import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, MIN_LENGTH } from 'class-validator';
import { MIN_CHARACTER } from 'src/constants';
@ValidatorConstraint({ name: 'isMinLengthCustom', async: false })
export class IsMinLengthCustom implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return !!text ? (text.length >= MIN_CHARACTER) : true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args?.property} must be longer than or equal to 8 characters`;
  }
}
