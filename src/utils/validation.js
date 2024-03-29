import * as yup from 'yup';
import { FormFields } from './constants';

export const FULL_NAME_SCHEMA = yup
    .object({
        [FormFields.FullName]: yup
            .string()
            .required('Full name is required')
            .matches(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/i, {
                message:
                    'Full name must contain first and second names, min 3 length each and only letters',
            }),
    })
    .required();

export const CREDENTIALS_SCHEMA = yup
    .object({
        [FormFields.Email]: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
        [FormFields.Password]: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one digit')
            .required('Password is required'),
        [FormFields.ConfirmPassword]: yup
            .string()
            .required()
            .oneOf([yup.ref(FormFields.Password)], 'Passwords must match'),
    })
    .required();

export const PAYMENT_METHOD_SCHEMA = yup
    .object({
        [FormFields.PaymentMethod]: yup.object({
            type: yup
                .string()
                .oneOf(['pp', 'cc'])
                .required('Payment method is required'),
            email: yup
                .string()
                .email('Invalid PayPal email address')
                .when('type', {
                    is: (val) => val === 'pp',
                    then: (schema) => schema.required('PayPal email is required'),
                    otherwise: (schema) => schema.notRequired(),
                }),
            cardNumber: yup.string().when('type', {
                is: (val) => val === 'cc',
                then: (schema) =>
                    schema
                        .matches(/^\d{16}$/, 'Credit card number must be 16 digits long')
                        .required('Credit card is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
    })
    .required();

export const FULL_REGISTRATION_SCHEMA = yup.object({
    ...FULL_NAME_SCHEMA.fields,
    ...CREDENTIALS_SCHEMA.fields,
    ...PAYMENT_METHOD_SCHEMA.fields,
});
