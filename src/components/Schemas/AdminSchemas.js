import * as yup from 'yup';
import { t } from 'i18n';

const AutocompleteValidate = yup.array().of(
    yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string(),
        })
        .required(t('login.required'))
);

export const employeesTabSchemas = yup.object().shape({
    firstname: yup.string().nullable().required('نام الزامی است'),
    lastname: yup.string().nullable().required('نام خانوادگی الزامی است'),
    national_code: yup.string().nullable().min(10, 'کدملی معتبر نیست').max(10, 'کدملی معتبر نیست').required('کدملی الزامی نیست'),
    mobile: yup
        .string()
        .matches(/^0?9([0-9]{9}$)/, { message: 'موبایل معتبر نمی‌باشد.', excludeEmptyString: false })
        .required('شماره موبایل الزامی است.'),
    postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی معتبر نیست'),
    email: yup.string().nullable().email('ایمیل معتبر نیست'),
});
// export const employeesTabSchemasNotMarrid = yup.object().shape({
//     firstname: yup.string().nullable().required('نام الزامی نیست'),
//     lastname: yup.string().nullable().required('نام خانوادگی الزامی نیست'),
//     national_code: yup.string().nullable().min(10, 'کدملی الزامی نیست').max(10, 'کدملی الزامی نیست').required('کدملی الزامی نیست'),
//     birthday: yup.string().nullable(),
//     mobile: yup.string().nullable().min(11, 'شماره الزامی نیست').max(11, 'شماره الزامی نیست').required('شماره الزامی نیست'),
//     postal_code: yup.string().nullable().min(10, 'کدپستی الزامی نیست').max(10, 'کدپستی الزامی نیست'),
//     email: yup.string().nullable().email('ایمیل الزامی نیست'),
// });
export const companiesSchemas = yup.object().shape({
    name: yup.string().nullable().required('نام الزامی است'),
    type: yup.string().nullable(),
    registration_number: yup.string().nullable(),
    email: yup.string().nullable().email('ایمیل  معتبر  نیست').required('ایمیل الزامی است'),
    ceo_name: yup.string().nullable().required('نام مدیرعامل الزامی است'),
    ceo_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    agent_name: yup.string().nullable().required('نام نماینده الزامی است'),
    agent_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    phone: yup.string().nullable().min(8, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی الزامی است'),
    address: yup.string().nullable(),
    province_id: yup.string().nullable(),
    city_id: yup.string().nullable(),
    second_address: yup.string().nullable(),
    economic_code: yup.string().nullable(),

    logo: yup
        .mixed()
        .test('fileType', 'عکس پروفایل معتبر است', (value) => {
            return ['image/jpeg', 'image/png'].includes(value?.type);
        })
        .required('عکس پروفایل الزامی است'),
});
export const companiesSchemasImage = yup.object().shape({
    name: yup.string().nullable().required('نام الزامی است'),
    type: yup.string().nullable(),
    registration_number: yup.string().nullable(),
    email: yup.string().nullable().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
    ceo_name: yup.string().nullable().required('نام مدیرعامل الزامی است'),
    ceo_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    // .integer('شماره الزامی است')
    agent_name: yup.string().nullable().required('نام نماینده الزامی است'),
    agent_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    phone: yup.string().nullable().min(8, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
    postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی معتبر نیست'),
    address: yup.string().nullable(),
    province_id: yup.string().nullable(),
    city_id: yup.string().nullable(),
    second_address: yup.string().nullable(),
    economic_code: yup.string().nullable(),
});
