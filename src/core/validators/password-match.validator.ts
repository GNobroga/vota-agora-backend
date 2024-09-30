import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import isNull from "../utils/is-null";


@ValidatorConstraint({ name: 'passwordMatch', async: false })
export default class PasswordMatchValidator implements ValidatorConstraintInterface {
    
    validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const targetPropertyName = validationArguments.constraints[0];
        const targetValue = validationArguments.object[targetPropertyName] as string;
        return !isNull(value) && !isNull(targetValue) && targetValue.trim() === value.trim();
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        const targetField = validationArguments.constraints[0];
        return `The ${targetField} does not match with ${validationArguments.property}`;
    }

}