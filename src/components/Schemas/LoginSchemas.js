import * as Yup from 'yup';
import { t } from '../../i18n';

export const ForgetPassStep1 = Yup.object().shape({
    mobile: Yup.string().required(t('login.required')),
});
export const ForgetPassStep2 = Yup.object().shape({
    mobile_token: Yup.string().required(t('login.required')),
});
export const ForgetPassStep3 = Yup.object().shape({
    password: Yup.string().matches(/^\S*$/, 'رمز عبور معتبر نیست').required(t('login.required')),
    verify_password: Yup.string()
        .oneOf([Yup.ref('password'), null], t('login.samePassword'))
        .required(t('login.required')),
});
