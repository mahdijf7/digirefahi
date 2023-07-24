import React, { useState, useEffect, useContext } from 'react';

import ProfileForm from './ProfileForm';
import Card from 'components/Common/Card/Card';
import userService from 'service/api/userService';
import Container from 'components/Common/Card/Container';
import AuthContext from 'store/Auth-context';
import DSnackbar from 'components/new/shared/DSnackbar';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

function UserProfile(props) {
    // const { profile } = useContext(AuthContext);
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const { validateToken } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [interests, setInterests] = useState(null);
    const [selectedInterest, setSelectedInterest] = useState(null);

    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const maritalStatusOptions = [
        { name: 'متاهل', id: 'YES' },
        { name: 'مجرد', id: 'NO' },
    ];
    const genderOption = [
        { name: 'زن', id: 'FEMALE' },
        { name: 'مرد', id: 'MALE' },
    ];
    const childrenOption = [
        { name: '0', id: '0' },
        { name: '1', id: '1' },
        { name: '2', id: '2' },
        { name: '3', id: '3' },
        { name: '4', id: '4' },
    ];

    const handleSelectInterest = (updatedInterest) => {
        setSelectedInterest(updatedInterest);
    };

    const fd = new FormData();
    const handleSubmit = async (values, actions) => {
        console.log(actions, 'LOG ACTIONS ');
        console.log(values);

        values.firstname && fd.append('firstname', values.firstname);
        values.lastname && fd.append('lastname', values.lastname);
        values.national_code && fd.append('national_code', values.national_code);
        values.birthday && fd.append('birthday', values.birthday);
        values.mobile && fd.append('mobile', values.mobile);
        values.gender && fd.append('gender', values.gender.id);
        values.child && fd.append('child', values.child.id);
        if (values.is_married) {
            fd.append('is_married', values.is_married.id);
            values.married_date && fd.append('married_date', values.married_date);
        }
        values.province_id && fd.append('province_id', values.province_id.id);
        values.city_id && fd.append('city_id', values.city_id.id);
        values.address && fd.append('address', values.address);
        values.postal_code && fd.append('postal_code', values.postal_code);
        values.email && fd.append('email', values.email);
        fd.append('avatar', values.avatar);
        selectedInterest && selectedInterest.map((el, index) => fd.append(`category_ides[${index}]`, el.id));

        postProfileData(actions);

        console.log(values);
    };

    const postProfileData = async (actions) => {
        setLoading({ ...loading, refresh: true });

        await userService
            .update(`/employee/profile`, fd)
            .then((res) => {
                setLoading({ ...loading, refresh: false });
                // const { msg } = res?.data?.meta;
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'حساب کاربری با موفقیت آپدیت شد .',
                        type: 'success',
                    },
                });
                getProfileData();
                validateToken();
            })
            .catch((err) => {
                setLoading({ ...loading, refresh: false });
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };

    const getProfileData = async () => {
        // setLoading({ ...loading, initial: true });
        console.log('run');
        await userService
            .get('/employee/profile')
            .then((res) => {
                setLoading({ ...loading, initial: false });
                let temp = res?.data?.data?.profile;
                temp.is_married = maritalStatusOptions.filter((item) => item.id === temp.is_married)[0];
                temp.child = childrenOption.filter((item) => item.id === temp.child)[0];
                temp.gender = genderOption.filter((item) => item.id === temp.gender)[0];
                temp.chart = temp.chart.name;
                setProfile(temp);
                setInterests(res.data.data.interests);
            })
            .catch((err) => {
                setLoading({ ...loading, initial: false });
            });
    };

    console.log(profile);

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <Container minHeight="calc(100vh - 6.6rem)" breadcrumb={UserProfileLinkData}>
            <Card p="3rem" className={loading.refresh && 'box--isLoading'}>
                <DLoadingWrapper loading={loading.initial}>
                    <ProfileForm
                        maritalStatusOptions={maritalStatusOptions}
                        genderOption={genderOption}
                        childrenOption={childrenOption}
                        handleSelectInterest={handleSelectInterest}
                        loading={loading}
                        interests={interests}
                        profile={profile}
                        handleSubmit={handleSubmit}
                    />
                </DLoadingWrapper>
            </Card>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Container>
    );
}

export default UserProfile;
const UserProfileLinkData = [
    { link: 'app/dashboard', title: 'پیشخوان', dash: '/' },
    { link: 'app/dashboard/profile', title: 'پروفایل' },
];
