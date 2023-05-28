import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isDateStringWithTimezone', async: false })
export class IsDateStringWithTimezone implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return Boolean(text.match(/^(\d{4}-\d{2}-\d{2}\+\d{2}:00)$/g)) && Boolean(Date.parse(text.substring(0, 10)))
      && Number(text.substring(10, 13)) >= -12 && Number(text.substring(10, 13)) <= 12;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is incorrect date value!';
  }
}
