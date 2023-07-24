import { useContext, useState } from 'react';
import { Grid, Box, Checkbox, TextField, Alert, TableBody, Button, Radio, FormControlLabel, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FieldArray } from 'formik';

// Utils
import AuthContext from 'store/Auth-context';

// Components
import { OrgAllocateCreditCategory } from 'components/new/pages/organization/allocate/OrgAllocateCreditCategory';
import { OrgAllocateCreditStats } from 'components/new/pages/organization/allocate/OrgAllocateCreditStats';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomCheckbox from 'components/Common/Form/CustomChekbox';

// Assets
import theme from 'assets/theme';

const OrgAllocateCredit = ({ values, employeeCount }) => {
    const { t } = useTranslation();
    const { account } = useContext(AuthContext);

    return (
        <Grid container sx={{ p: '0 22px 50px 22px', borderBottom: '1px solid #D9D9D9', mb: '40px' }}>
            <Grid item xs={12}>
                <Box>
                    <FormControlLabel
                        sx={{
                            mr: 0,
                            '& .MuiTypography-root': {
                                fontSize: '20px',
                                color: values.type === 'credit' ? '#000' : 'rgba(119, 119, 119, 1)',
                            },
                        }}
                        value="credit"
                        control={<Radio />}
                        label="تخصیص اعتبار رفاهی"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} className={values.type === 'service' ? 'box--isLoading' : ''}>
                <Grid container>
                    <FieldArray
                        name="budgets"
                        render={(arrayHelpers) => (
                            <Grid item xs={12} px="34px" mt="14px">
                                <Grid container>
                                    <Grid item xs={12} sx={{display: 'flex'}}>
                                        <Alert
                                            sx={{ ml: 'auto', my: '20px', '& .MuiAlert-icon': { m: '0 0 0 10px' } }}
                                            severity="warning">
                                            چنانچه هیچ دسته‌بندی انتخاب نکنید مبلغ وارد شده به عنوان اعتبار آزاد تخصیص داده میشود.
                                        </Alert>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container rowSpacing="30px" sx={{ pt: '6px' }}>
                                            {values.budgets &&
                                                values.budgets.map((budget, index) => (
                                                    <OrgAllocateCreditCategory
                                                        budget={values.budgets[index]}
                                                        key={budget.id || budget.fakeId || index}
                                                        baseName={`budgets[${index}].`}
                                                        disableDelete={values.budgets.length === 1}
                                                        onDelete={() => arrayHelpers.remove(index)}
                                                    />
                                                ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={2} mt="30px">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="button"
                                            sx={{ fontSize: '14px' }}
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    category: null,
                                                    price: '',
                                                    fakeId: new Date().getMilliseconds(),
                                                })
                                            }>
                                            <AddIcon />
                                            {t('addRow')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    />

                    {values.budgets.reduce((f, c) => {
                        if (+c.amount) f += +c.amount;
                        return f;
                    }, 0) > account.wallet.remain && (
                        <Alert sx={{ mt: '30px', '& .MuiAlert-icon': { m: '0 0 0 10px' } }} severity="error">
                            مجموع مبلغ تخصیص یافته نباید از موجودی کیف پول بیشتر باشد.
                        </Alert>
                    )}

                    {/* Credit Stats */}
                    <OrgAllocateCreditStats employeeCount={employeeCount} />

                    {/* <Grid item xs={12} mt="30px">
                        <Box sx={{ display: 'flex', gap: '25px' }}>
                            <CustomCheckbox
                                sx={{ mr: 0, '& .MuiTypography-root': { fontSize: '14px', fontWeight: 600 } }}
                                name="sms"
                                label="ارسال توضیحات به صورت پیامک"
                            />

                            <CustomInputBase
                                disabled={!values.sms}
                                wrapperSx={{ flex: 1 }}
                                name="smsText"
                                placeholder="توضیحات در این قسمت نوشته شود"
                            />
                        </Box>
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default OrgAllocateCredit;
