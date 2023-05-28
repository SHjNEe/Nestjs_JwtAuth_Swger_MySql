import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isDateString', async: false })
export class IsDateString implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return !!text && Boolean(text.match(/^(\d{4}-\d{2}-\d{2})$/g)) && Boolean(Date.parse(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is incorrect date value!';
  }
}
