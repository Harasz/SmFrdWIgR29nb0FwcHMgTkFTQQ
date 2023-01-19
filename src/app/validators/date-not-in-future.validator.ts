import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateNotInFuture' })
export class DateNotInFutureRule implements ValidatorConstraintInterface {
  validate(propertyValue: string) {
    return this.getTimestampFromDateString(propertyValue) < Date.now();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be in the future`;
  }

  private getTimestampFromDateString(dateString: string) {
    return new Date(dateString).getTime();
  }
}

export function DateNotInFuture(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'DateNotInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DateNotInFutureRule,
    });
  };
}
