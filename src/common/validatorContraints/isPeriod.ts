import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPeriod', async: false })
export class IsPeriod implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return Boolean(text.match(/^(\d{4}-\d{2})$/g)) && Boolean(Date.parse(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is incorrect period value!';
  }
}
