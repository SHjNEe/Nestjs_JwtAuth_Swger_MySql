import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
@ValidatorConstraint({ name: 'IsNumberText', async: false })
export class IsNumberText implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const format = /[0-9]+$/;
    return format.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} can contain only numbers`;
  }
}
