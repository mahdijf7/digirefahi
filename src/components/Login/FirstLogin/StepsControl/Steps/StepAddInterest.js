import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import ButtonBack from 'components/Common/Buttons/ButtonBack';
import GridServiceChekbox from 'components/Common/Grid/GridServiceChekbox';
import StepperContext from 'store/Stepper-context';
import { useSnackbar } from 'store/Snackbar-context';
import userService from 'service/api/userService';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DSnackbar from 'components/new/shared/DSnackbar';

function StepAddInterest(props) {
    const { showAlert } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [loadingGet, setLoadingGet] = useState(false);
    const [checkedIds, setCheckedIds] = useState([]);
    const [checkData, setCheckData] = useState([]);
    const { activeStep, handleBack, setActiveStep } = useContext(StepperContext);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const queryString = new URLSearchParams();

    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
        checkedIds: '',
    };

    checkedIds && checkedIds.map((el, index) => queryString.append(`category_ides[${index}]`, el));

    const handleSubmit = async (values, actions) => {
        addInterest();
    };

    const addInterest = async () => {
        setLoading(true);
        await userService
            .postInterest(queryString)
            .then((res) => {
                setLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'علاقه مندی ها اضافه شد .',
                        type: 'success',
                    },
                });
                setActiveStep(0);
                localStorage.setItem('floginActiveStep', 0);
                window.location.href = '/app/dashboard';
            })
            .catch((err) => {
                setLoading(false);
                showAlert(err?.message, 'error');
            });
    };
    const getAddInterest = async (data) => {
        setLoadingGet(true);
        await userService
            .getInterest(data)
            .then((res) => {
                setLoadingGet(false);
                setCheckData(res?.data?.data);
            })
            .catch((err) => {
                setLoadingGet(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
            });
    };

    useEffect(() => {
        getAddInterest();
    }, []);

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <Box
                    p="3rem"
                    minHeight="35rem"
                    height="100%"
                    bgcolor="common.white"
                    borderRadius="1.4rem"
                    boxShadow={1}
                    position="relative">
                    <DLoadingWrapper sx={{ mt: '20px' }} loading={loadingGet}>
                        <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                            <Grid item mt="1rem" xs={10} sm={12}>
                                <Typography variant="h2">{t('firstLogin.chooseYourInterest')}</Typography>
                                <Typography variant="body1">
                                    {t('firstLogin.thisWouldLetUsToOferYouServisesWithYourInterest')}
                                </Typography>
                            </Grid>
                            <Grid mt="6rem" item xs={4} sm={12}>
                                <GridServiceChekbox data={checkData} checkedIds={checkedIds} setCheckedIds={setCheckedIds} />
                            </Grid>
                        </Grid>
                        <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                            <Grid item mt="10%" xs={10} sm={6} className="flex" justifyContent="flex-start">
                                <ButtonBack onClick={handleBack} disabled={activeStep === 0} sx={{ width: '25%' }}>
                                    {t('firstLogin.back')}
                                </ButtonBack>
                            </Grid>
                            <Grid item mt="10%" xs={10} sm={6} className="flex" justifyContent="flex-end">
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    loading={loading}
                                    sx={{ fontSize: '14px' }}>
                                    {t('firstLogin.confirmData')}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </DLoadingWrapper>
                    <DSnackbar
                        open={snackBarData.show}
                        info={snackBarData.data}
                        onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                    />
                </Box>
            </Form>
        </Formik>
    );
}

export default StepAddInterest;
// checkData.map((el, index) => (query += `categories_ides[${index}] = ${el}&`));
// query = query.substring(0, query.length - 1);
