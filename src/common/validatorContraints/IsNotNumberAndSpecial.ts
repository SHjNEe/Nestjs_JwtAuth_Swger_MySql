import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
@ValidatorConstraint({ name: 'isNotNumberIsSpecial', async: false })
export class IsNotNumberIsSpecial implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const format = /[a-zA-Z]+$/;
    return format.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} cannot contain numbers and special characters`;
  }
}
