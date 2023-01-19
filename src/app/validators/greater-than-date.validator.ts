import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'GreaterThanDate' })
export class GreaterThanDateRule implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return (
      this.getTimestampFromDateString(args.object[args.constraints[0]]) <
      this.getTimestampFromDateString(propertyValue)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be greater than ${args.constraints[0]}`;
  }

  private getTimestampFromDateString(dateString: string) {
    return new Date(dateString).getTime();
  }
}

export function GreaterThanDate(
  otherDatePropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'GreaterThanDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [otherDatePropertyName],
      validator: GreaterThanDateRule,
    });
  };
}
