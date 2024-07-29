import Joi, { ValidationErrorItem } from 'joi';
import { Card2D, LoginUser, RegisterUser2D } from '../@types';

export default function validation(schema: Joi.Schema, data: RegisterUser2D | LoginUser | Card2D | any) {
    const { error } = schema.validate(data, { abortEarly: false });

    return error ? Object.fromEntries(new Map(error.details.map((i: ValidationErrorItem) =>
        [i.path[i.path.length - 1], i.message])).entries()) : null;

}