import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInputBase from '../../../components/Common/Form/CustomInputBase';
import SubmitButtonFill from '../../../components/Common/Form/SubmitButtonFill';
import { Grid, Typography, Button, Box, CircularProgress } from '@mui/material';
import { theme } from '../../../assets/theme/default';
import JalaliDatePicker from '../../../components/Common/Form/JalaliDatePicker';
import ButtonBack from '../../../components/Common/Buttons/ButtonBack';
import DashboardCard from '../../../components/Common/Card/DashboardCard';
import CustomProfileChekbox from '../../../components/Common/Checkbox/CustomProfileChekbox';
import Breadcrumb from '../../../components/Common/Breadcrumb/Breadcrumb';

function ProfilePassAdmin({ setIsStepOne }) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const Validation_Schema = Yup.object({
    firstName: Yup.string('').required(t('login.required')),
    lastName: Yup.string('').required(t('login.required')),
    nationalCode: Yup.string('').required(t('login.required')),
  });

  const Initial_Values = {
    firstName: '',
    lastName: '',
    nationalCode: '',
  };
  const handleSubmit = async (values) => {
   
    // activeStep === steps.length - 1 ? 'Finish' : 'Next';
  };
  const linkData = [
    { link: 'app/dashboard', title: 'پیشخوان', dash: '/' },
    { link: 'app/dashboard/profile', title: 'حساب کاربری' },
  ];

  return (
    <>
      <DashboardCard pt="2rem">
        <Breadcrumb data={linkData} />
        <Box p="3rem" height="100%" bgcolor="common.white" borderRadius="1.4rem" boxShadow={1}>
          <Formik
            initialValues={Initial_Values}
            validationSchema={Validation_Schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid
                className="column"
                alignItems="space-between"
                justifyContent="space-between"
                container
              >
                <Grid item mt="1rem" xs={10} sm={5.6}>
                  <CustomInputBase
                    height="5.3rem"
                    borderRadius=".8rem"
                    sx={inputStyle}
                    showlabel="true"
                    name="userName"
                    title={t('profile.userName')}
                    placeholder={t('profile.userName')}
                  />
                </Grid>
                <Grid item mt="1rem" xs={10} sm={5.6} />
                <Grid item mt="1rem" xs={10} sm={5.6}>
                  <CustomInputBase
                    height="5.3rem"
                    borderRadius=".8rem"
                    sx={inputStyle}
                    showlabel="true"
                    name="newPassword"
                    title={t('profile.newPassword')}
                    placeholder={t('profile.newPassword')}
                  />
                </Grid>
                <Grid item mt="1rem" xs={10} sm={5.6}>
                  <CustomInputBase
                    height="5.3rem"
                    borderRadius=".8rem"
                    sx={inputStyle}
                    showlabel="true"
                    name="confirmPassword"
                    title={t('profile.repeatPassword')}
                    placeholder={t('profile.repeatPassword')}
                  />
                </Grid>

                <Grid item xs={10} sm={12} className="flex" justifyContent="flex-start" mt="5rem">
                  {/* <SubmitButtonFill disabled={loading} width="15%">
                    {!loading ? (
                      <Typography fontSize="1.7rem" variant={"body3"}>
                        {t("profile.update")}
                      </Typography>
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </SubmitButtonFill> */}
                  <button type="button" onClick={() => setIsStepOne((prev) => !prev)}>
                    <Typography fontSize="1.7rem" variant={'body3'}>
                      {t('profile.update')}
                    </Typography>
                  </button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </DashboardCard>
    </>
  );
}

export default ProfilePassAdmin;

const inputStyle = {
  backgroundColor: theme.palette.info.input,
  borderRadius: '.8rem !important',
  '& .MuiOutlinedInput-root': {
    height: '5.3rem',
    color: ` ${theme.palette.common.black}`,
    '& fieldset': {
      border: `.1rem solid ${theme.palette.info.border} `,
    },
  },
  '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
    paddingRight: '7%',
    borderRadius: '.8rem !important',
  },
  '& .MuiAutocomplete-endAdornment': {
    right: '90% !important',
    '& svg': {
      width: '3rem',
      height: '3rem',
    },
  },
};
