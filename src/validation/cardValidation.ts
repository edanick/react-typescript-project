import Joi from 'joi';

import { Card2D } from '../@types';
import validation from './validation';
import { phonePattern, urlPattern } from './patterns';


export default function validateCard(data: Card2D) {

    const requirements = Joi.string().min(2).max(256),
        required = requirements.required(),
        optional = requirements.allow('');

    return validation(Joi.object({
        title: required,
        subtitle: required,
        phone: Joi.string().min(9).max(11).required().pattern(phonePattern)
            .messages({
                "string.pattern.base": "Phone pattern : 0501234567",
                "string.empty": "Phone pattern : 0501234567",
            }),
        description: Joi.string().required().min(2).max(1024),
        web: optional,
        email: Joi.string().email({ tlds: { allow: false } }).min(5).required(),
        url: Joi.string().min(14).allow('').pattern(urlPattern).messages({
            "string.pattern.base": "Please enter a valid url",
        }),
        alt: optional,
        state: optional,
        country: required,
        city: required,
        street: required,
        houseNumber: Joi.number().min(2).max(256).required(),
        zip: Joi.number().min(2).max(256).allow('')
    }), data);

}

