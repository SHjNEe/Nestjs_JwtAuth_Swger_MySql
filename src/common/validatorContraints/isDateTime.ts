import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isDateTime', async: false })
export class IsDateTime implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return !!text && Boolean(text.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/g)) && Boolean(Date.parse(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is incorrect datetime value!';
  }
}
