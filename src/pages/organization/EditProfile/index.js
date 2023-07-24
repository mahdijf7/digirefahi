import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import * as yup from 'yup';
import { getErrorTranslation } from 'utils/helpers';
import { useTranslation } from 'react-i18next';

//component
import DSnackbar from 'components/new/shared/DSnackbar';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import organizationService from 'service/api/organization.service';
import ProfileDetailsForm from './ProfileForm';
import AuthContext from 'store/Auth-context';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DBox from 'components/new/shared/DBox';

function ProfileEdit() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState({ initial: true, update: false, refresh: false });
    const { validateToken } = useContext(AuthContext);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();

    const validationSchema = yup.object().shape({
        name: yup.string().nullable().required('نام الزامی است'),
        type: yup.string().nullable().required('نوع شرکت الزامی است'),
        email: yup.string().nullable().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
        ceo_name: yup.string().nullable().required('نام مدیرعامل الزامی است'),
        ceo_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره الزامی است'),
        agent_name: yup.string().nullable().required('نام نماینده الزامی است'),
        agent_phone: yup
            .string()
            .nullable()
            .min(11, 'شماره معتبر نیست')
            .max(11, 'شماره معتبر نیست')
            .required('نام نماینده الزامی است'),
        phone: yup.string().nullable().min(8, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست'),
        postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی معتبر نیست'),

        logo: yup.mixed().when([], {
            is: () => !profile?.logo,
            then: yup
                .mixed()
                .test('fileType', t('تصویر الزامی است'), (value) => {
                    return ['image/jpeg', 'image/png'].includes(value?.type);
                })
                .required(t('تصویر الزامی است')),
            otherwise: yup.mixed().nullable().notRequired(),
        }),
    });

    const fd = new FormData();
    const handleSubmit = async (values, actions) => {
   

        values.name && fd.append('name', values.name);
        values.type && fd.append('type', values.type);
        values.registration_number && fd.append('registration_number', values.registration_number);
        values.email && fd.append('email', values.email);
        values.ceo_name && fd.append('ceo_name', values.ceo_name);
        values.ceo_phone && fd.append('ceo_phone', values.ceo_phone);
        values.economic_code && fd.append('economic_code', values.economic_code);
        values.agent_name && fd.append('agent_name', values.agent_name);
        values.agent_phone && fd.append('agent_phone', values.agent_phone);
        values.phone && fd.append('phone', values.phone);
        values.postal_code && fd.append('postal_code', values.postal_code);
        values.address && fd.append('address', values.address);
        values.province_id && fd.append('province_id', values.province_id);
        values.city_id && fd.append('city_id', values.city_id);
        values.second_address && fd.append('second_address', values.second_address);
        values.newspaper_image && fd.append('newspaper_image', values.newspaper_image);
        values.logo && fd.append('logo', values.logo);

        updateLegalDetail(fd, actions);
    };

    const getLegalDetail = async (tab) => {
        setLoading((prev) => {
            return { ...prev, refresh: true };
        });
        await organizationService
            .get(`profile`, tab)
            .then((res) => {
                setProfile(res.data.data);
                // setAccount(res.data.data);

                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            });
    };
    const updateLegalDetail = async (data, actions) => {
        setLoading((prev) => {
            return { ...prev, update: true };
        });
        await organizationService
            .update(`profile`, data)
            .then((res) => {
                setLoading((prev) => {
                    return { ...prev, update: false };
                });
                getLegalDetail();
                validateToken();
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'مشخصات حقوقی سازمان با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, update: false };
                });
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });

                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };

    useEffect(() => {
        getLegalDetail();
    }, []);

    return (
        <DashboardCard pt="24px">
            <Breadcrumb links={breadCrumbLinks} />

            <DLoadingWrapper loading={loading.initial}>
                <DBox sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <ProfileDetailsForm
                        validationSchema={validationSchema}
                        profile={profile}
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </DBox>
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
}

const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        title: 'ویرایش پروفایل',
    },
];
export default ProfileEdit;
const boxStyle = {
    position: 'relative',
};
const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
