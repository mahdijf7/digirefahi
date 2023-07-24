import * as yup from 'yup';
import { t } from 'i18n';

//! firstlogin

const AutocompleteValidate = yup.array().of(
    yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required'))
);

export const forgetPassSchemas = yup.object({
    password: yup.string('').required(t('login.required')),
    confirm_password: yup
        .string('')
        .oneOf([yup.ref('password'), null], t('login.samePassword'))
        .required(t('login.required')),
});

export const addProfileSchemas = yup.object({
    // firstname: yup.string('').required(t('login.required')),
    // lastname: yup.string('').required(t('login.required')),
    // mobile: yup.string('').required(t('login.required')),
    // national_code: yup.string('').required(t('login.required')),
    gender: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required')),
    birthday: yup.string('').required(t('login.required')),

    is_married: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required')),
    married_date: yup.string('').required(t('login.required')),
    province_id: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required')),
    city_id: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required')),
    address: yup.string('').required(t('login.required')),
    child: yup.string(''),
    email: yup.string('').required(t('login.required')),
    postal_code: yup.string('').required(t('login.required')),
});

//! profile

export const profileSchema = yup.object({
    firstname: yup.string('').required(t('login.required')),
    lastname: yup.string('').required(t('login.required')),
    mobile: yup.string('').required(t('login.required')),
    national_code: yup.string('').required(t('login.required')),
    dateOfBirth: yup.string(''),
    gender: AutocompleteValidate,
    phoneNumber: yup.string(''),
    chartLevel: yup.string(''),
    group: yup.string(''),
    mail: yup.string(''),
    marialStatus: yup.string(''),
    dateOfMarriage: yup.string(''),
    numberOfChildren: yup.string(''),
    province: yup.string(''),
    city: yup.string(''),
    zipCode: yup.string(''),
    address: yup.string(''),
});
