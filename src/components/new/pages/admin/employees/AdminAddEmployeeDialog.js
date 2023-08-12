import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { Form, Formik, FieldArray, ErrorMessage } from 'formik';

// Utils
import adminService from 'service/api/adminService';
import { getErrorTranslation } from 'utils/helpers';

// Components
import DTabs from 'components/new/shared/DTabs/DTabs';
import DTabsPanel from 'components/new/shared/DTabs/DTabsPanel';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import CustomChip from 'components/Common/Form/CustomChip';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import { json } from 'react-router-dom';

const persianNumberInWords = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'شیش', 'هفت', 'هشت', 'نه', 'ده'];

const AdminAddEmployeeDialog = ({ onClose, onSave }) => {
    const [loading, setLoading] = useState({ save: false });
    const { t } = useTranslation();
    const Validation_Schema = Yup.object({
        firstname: Yup.string('').required(getErrorTranslation(t('errors.required'), { name: 'نام' })),
        lastname: Yup.string('').required(getErrorTranslation(t('errors.required'), { name: 'نام خانوادگی' })),
        national_code: Yup.string('').required(getErrorTranslation(t('errors.required'), { name: 'کد ملی' })),
        company_id: Yup.object()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'سازمان' })),
        chart: Yup.array().of(
            Yup.object().test('check-first-element', getErrorTranslation(t('errors.required'), { name: 'چارت سازمانی' }), function () {
                const { parent } = this;
                const firstEle = parent[0]; 
                return typeof firstEle === 'object';
            })
        ),
    });

    const tabs = [{ id: 1, title: t('employees.employeInfo') }];
    const addFormInitialValues = {
        firstname: '',
        lastname: '',
        national_code: '',
        mobile: '',
        chart: [''],
        company_id: '',
    };

    const handleSubmit = async (values, actions) => {
        if (loading.save) return;
        setLoading({ save: true });

        const queryString = new URLSearchParams();
        if (values.firstname) queryString.append('firstname', values.firstname);
        if (values.lastname) queryString.append('lastname', values.lastname);
        if (values.national_code) queryString.append('national_code', values.national_code);
        if (values.mobile) queryString.append('mobile', values.mobile);
        if (values.groups && values.groups.length > 0) {
            values.groups.forEach((item, index) => {
                queryString.append(`group_ides[${index}]`, item.id);
            });
        }
        if (values.company_id) queryString.append('company_id', values.company_id.id);
        if (Array.isArray(values.chart)) {
            const chartWithValue = values.chart.filter((item) => !!item);
            if (chartWithValue.length > 0) {
                queryString.append(`chart_id`, chartWithValue[chartWithValue.length - 1].id);
            }
        }

        await adminService
            .createEmployee(queryString.toString())
            .then((res) => {
                onSave();
            })
            .catch((err) => {
                console.log(err.response.data.data, 987);
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
        setLoading({ save: false });
    };

    return (
        <DDialogWrapper open onClose={onClose}>
            <DDialogHeader
                title="افزودن کارمند"
                icon={<PersonAddAltIcon fontSize="large" sx={{ color: 'rgba(8, 119, 189, 1)' }} />}
                onClose={onClose}
            />

            <Grid container spacing={2} mt="20px">
                <Grid item xs={12}>
                    <DTabs activeTabId={1} tabs={tabs} />

                    <DTabsPanel value={1} index={1}>
                        <Grid container spacing={2} sx={{ padding: '20px 40px 0 40px' }}>
                            <Grid item xs={12}>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={addFormInitialValues}
                                    validationSchema={Validation_Schema}
                                    onSubmit={handleSubmit}>
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <Grid columnSpacing={8} rowSpacing="14px" container>
                                                <Grid item xs={12} md={6}>
                                                    <CustomInputBase
                                                        showlabel="true"
                                                        name="firstname"
                                                        title={t('employees.firstName')}
                                                        placeholder={t('employees.firstName')}
                                                        weight
                                                        hasDefaultStyle
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CustomInputBase
                                                        showlabel="true"
                                                        name="lastname"
                                                        title={t('employees.lastName')}
                                                        placeholder={t('employees.lastName')}
                                                        weight
                                                        hasDefaultStyle
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CustomInputBase
                                                        showlabel="true"
                                                        name="national_code"
                                                        title={t('employees.nationalCode')}
                                                        placeholder={t('employees.enterNationalCode')}
                                                        weight
                                                        hasDefaultStyle
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CustomInputBase
                                                        showlabel="true"
                                                        name="mobile"
                                                        title={t('employees.phoneNumber')}
                                                        placeholder={t('employees.phoneNumberExample')}
                                                        weight
                                                        hasDefaultStyle
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            <DAutoComplete
                                                                name="company_id"
                                                                label="سازمان"
                                                                placeholder="انتخاب سازمان"
                                                                buttonProps={{ label: 'سازمان را انتخاب کنید' }}
                                                                formControlStyle={{ height: '42px' }}
                                                                isAsync
                                                                callOnOpen
                                                                searchOnType
                                                                apiPath={`admin/companies`}
                                                                onSelect={() => {
                                                                    setFieldValue('chart', ['']);
                                                                }}
                                                            />
                                                        </Grid>
                                                        {values.company_id && (
                                                            <>
                                                                <Grid item xs={12} mt="16px">
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '13px',
                                                                            fontWeight: 600,
                                                                            mb: '5px',
                                                                        }}>
                                                                        چارت سازمانی
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Grid container rowSpacing={'12px'}>
                                                                        <FieldArray
                                                                            name="chart"
                                                                            render={(arrayHelpers) =>
                                                                                values.chart &&
                                                                                values.chart.map((chart, index) => (
                                                                                    <Grid
                                                                                        item
                                                                                        xs={12}
                                                                                        key={`chart${
                                                                                            chart.id
                                                                                                ? `${chart.name}-${chart.id}`
                                                                                                : new Date()
                                                                                        }`}>
                                                                                        <DAutoComplete
                                                                                            name={`chart[${index}]`}
                                                                                            formControlStyle={{
                                                                                                height: '42px',
                                                                                            }}
                                                                                            buttonProps={{
                                                                                                label: `سطح ${persianNumberInWords[index]} سازمان را انتخاب کنید`,
                                                                                            }}
                                                                                            defaultValue={chart}
                                                                                            isAsync
                                                                                            callOnOpen
                                                                                            apiPath={`admin/charts?company_id=${
                                                                                                values.company_id.id
                                                                                            }${
                                                                                                index > 0
                                                                                                    ? '&parent_id=' +
                                                                                                      values.chart[index - 1].id
                                                                                                    : ''
                                                                                            }`}
                                                                                            optionValueKey="name"
                                                                                            apiResponseExtraKey="charts"
                                                                                            onSelect={(selectedValue) => {
                                                                                                for (
                                                                                                    let i = index + 1;
                                                                                                    i < values.chart.length;
                                                                                                    i++
                                                                                                ) {
                                                                                                    arrayHelpers.pop();
                                                                                                }

                                                                                                if (selectedValue) {
                                                                                                    (selectedValue.child ||
                                                                                                        (selectedValue.children_all &&
                                                                                                            selectedValue
                                                                                                                .children_all
                                                                                                                .length > 0)) &&
                                                                                                        arrayHelpers.push('');
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </Grid>
                                                                                ))
                                                                            }
                                                                        /> 
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                {values.company_id && (
                                                    <>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container rowSpacing={'12px'}>
                                                                <Grid item xs={12}>
                                                                    <DAutoComplete
                                                                        name="groups"
                                                                        formControlStyle={{ height: '42px' }}
                                                                        buttonProps={{
                                                                            label: 'گروه را انتخاب کنید',
                                                                        }}
                                                                        isAsync
                                                                        multiple
                                                                        callOnOpen
                                                                        apiPath={`admin/groups?company_id=${values.company_id?.id}`}
                                                                        label="گروه"
                                                                        inputPlaceholder="جستجوی گروه"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={8}>
                                                                    <CustomChip
                                                                        chipStyle={{}}
                                                                        labelKey="name"
                                                                        handleDeleteChip={(group) => {
                                                                            setFieldValue(
                                                                                'groups',
                                                                                values.groups.filter(
                                                                                    (item) => item.id !== group.id
                                                                                )
                                                                            );
                                                                        }}
                                                                        chipOption={values.groups}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                        gap: '10px',
                                                        marginTop: '100px',
                                                    }}>
                                                    <Button variant="outlined" sx={{ fontSize: '14px' }} onClick={onClose}>
                                                        انصراف
                                                    </Button>
                                                    <LoadingButton
                                                        loading={loading.save}
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                                        ثبت اطلاعات
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    </DTabsPanel>
                </Grid>
            </Grid>
        </DDialogWrapper>
    );
};

export default AdminAddEmployeeDialog;
