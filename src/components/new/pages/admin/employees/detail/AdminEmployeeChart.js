import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, Formik, FieldArray } from 'formik';

// utils
import adminService from 'service/api/adminService';
import { getErrorForSnackbar } from 'utils/helpers';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomChip from 'components/Common/Form/CustomChip';

const persianNumberInWords = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'شیش', 'هفت', 'هشت', 'نه', 'ده'];

const AdminEmployeeChart = ({ employeeId, onClose, onSave }) => {
    const [loading, setLoading] = useState({ initial: true, update: false });
    const [status, setStatus] = useState({});
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();

    const update = async (values, actions) => {
        if (loading.update) return;
        setLoading({ ...loading, update: true });

        const queryParams = new URLSearchParams();
        queryParams.append('tab', 'company_status');
        queryParams.append('_method', 'put');
        if (values.chart && values.chart.length > 0) {
            const chartsWithValue = values.chart.filter((item) => !!item);
            chartsWithValue[chartsWithValue.length - 1]?.id &&
                queryParams.append(`chart_id`, chartsWithValue[chartsWithValue.length - 1].id);
        }
        if (values.groups && values.groups.length > 0) {
            values.groups.map((item, index) => queryParams.append(`group_ides[${index}]`, item.id));
        }

        console.log('step 1', values.chart);
        await adminService
            .update(`employees/${employeeId}?${queryParams.toString()}`)
            .then((res) => {
                onSave(t('employeeChartUpdatedSuccessfully'));
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                    setSnackBarData({
                        show: true,
                        data: {
                            text: errorMsg,
                            type: 'error',
                        },
                    });
            });

        setLoading({ ...loading, update: false });
    };

    useEffect(() => {
        (async () => {
            await adminService
                .get(`employees/${employeeId}?tab=company_status`)
                .then((res) => {
                    let temp = res.data.data;
                    let flattendChart = [];
                    function flat(chart) {
                        flattendChart.push(chart);
                        if (chart.parent) flat(chart.parent);
                    }
                    res.data.data?.chart && flat(res.data.data.chart);
                    temp.chart = res.data.data?.chart ? flattendChart.reverse() : [];

                    // if the last chart item has children or there is no selected chart to render we need to show an empty autocomplete
                    if (temp.chart.length === 0 || temp.chart[temp.chart.length - 1]?.child) temp.chart.push('');

                    setStatus(() => temp);
                })
                .catch((err) => {
                    console.log(err, 123);
                });

            setLoading({
                initial: false,
            });
        })();
    }, [employeeId]);

    return (
        <Box mt="20px" sx={{ overflow: 'hidden' }}>
            <DLoadingWrapper loading={loading.initial}>
                <Grid container>
                    <Formik style={{ width: '100%' }} enableReinitialize={true} initialValues={status} onSubmit={update}>
                        {({ values, setFieldValue }) => (
                            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '30px',
                                    }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>چارت سازمانی</Typography>
                                    {values.chart?.length > 0 && values.chart[0]?.name && (
                                        <Box
                                            sx={{
                                                background: '#EDFBFF',
                                                border: '1px solid #0877BD',
                                                borderRadius: '6px',
                                                minHeight: '28px',
                                                padding: '0px 12px',
                                                color: '#0877BD',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                            {values.chart
                                                .filter((item) => !!item)
                                                .map(
                                                    (item, index) =>
                                                        `${index < values.chart.length - 1 ? item.name + ' / ' : item.name}`
                                                )}
                                        </Box>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <FieldArray
                                        sx={{ display: 'flex' }}
                                        name="chart"
                                        render={(arrayHelpers) => (
                                            <Grid container columnSpacing="42px" rowSpacing="12px" mt="12px">
                                                {values.chart &&
                                                    values.chart.map((chart, index) => (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={6}
                                                            md={4}
                                                            key={`chart${chart?.id ? `${chart.name}-${chart.id}` : new Date()}`}>
                                                            <DAutoComplete
                                                                name={`chart[${index}]`}
                                                                label={`سطح ${persianNumberInWords[index]} سازمان`}
                                                                formControlStyle={{ height: '42px' }}
                                                                defaultValue={chart}
                                                                buttonProps={{ label: 'انتخاب سطح' }}
                                                                placeholder="سطح"
                                                                weight
                                                                isAsync
                                                                callOnOpen
                                                                apiPath={`admin/charts?company_id=${status.company_id}${
                                                                    index > 0 ? '&parent_id=' + values.chart[index - 1].id : ''
                                                                }`}
                                                                optionValueKey="name"
                                                                apiResponseExtraKey="charts"
                                                                onSelect={(selectedValue) => {
                                                                    for (let i = index + 1; i < values.chart.length; i++) {
                                                                        arrayHelpers.pop();
                                                                    }
                                                                    if (selectedValue) {
                                                                        (selectedValue.child ||     
                                                                            (selectedValue.children_all &&
                                                                                selectedValue.children_all
                                                                                    .length > 0)) &&
                                                                            arrayHelpers.push('');
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        mt: '50px',
                                        p: '25px 0 40px 0',
                                        borderTop: '1px solid rgba(0, 0, 0, 0.2)',
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                                    }}>
                                    <Grid container columnSpacing="42px">
                                        <Grid item xs={12} sm={6} md={4}>
                                            <DAutoComplete
                                                name="groups"
                                                defaultValue={values.groups}
                                                label={t('groups')}
                                                weight
                                                buttonProps={{ label: 'گروه ها' }}
                                                placeholder="جستجوی گروه"
                                                formControlStyle={{ height: '42px' }}
                                                isAsync
                                                callOnOpen
                                                multiple
                                                apiPath={`admin/groups?company_id=${values.company_id}`}
                                            />
                                        </Grid>
                                        <Grid item mt="25px" xs={12} sm={6} md={8}>
                                            <CustomChip
                                                chipStyle={{}}
                                                labelKey="name"
                                                handleDeleteChip={(group) => {
                                                    setFieldValue(
                                                        'groups',
                                                        values.groups.filter((item) => item.id !== group.id)
                                                    );
                                                }}
                                                chipOption={values.groups}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '10px',
                                        marginTop: '50px',
                                    }}>
                                    <Button variant="outlined" sx={{ fontSize: '14px' }} onClick={onClose}>
                                        انصراف
                                    </Button>
                                    <LoadingButton
                                        loading={loading.update}
                                        type="submit"
                                        variant="contained"
                                        sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                        به‌روزرسانی
                                    </LoadingButton>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
};

export default AdminEmployeeChart;
