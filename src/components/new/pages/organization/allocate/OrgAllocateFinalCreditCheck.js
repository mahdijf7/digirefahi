import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, TableCell, TableHead, TableBody, TableRow, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Utils
import organizationService from 'service/api/organization.service';
import { getErrorTranslation } from 'utils/helpers';
import AuthContext from 'store/Auth-context';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import DTableCell from 'components/new/shared/DTable/DTableCell';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';

// Assets
import theme from 'assets/theme';

const OrgAllocateFinalCreditCheck = ({ values, employeeSelection, onClose, onAllocate }) => {
    const { account } = useContext(AuthContext);
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ allocate: false });
    const sum = values.budgets.reduce((f, c) => {
        if (+c.amount) f += +c.amount;
        return f;
    }, 0);

    console.log(values, employeeSelection, 876);

    const handleSubmit = async () => {
        console.log(employeeSelection, values);
        if (loading.allocate) return;
        setLoading({ allocate: true });

        const params = new URLSearchParams();

        if (employeeSelection.selectAll && employeeSelection.employeeSelectionType === 'filters') {
            params.append(`select`, 'ALL');
            employeeSelection.employeeExceptions.forEach((item, index) => {
                params.append(`except_employee_ides[${index}]`, item.id);
            });

            if (employeeSelection.gender) {
                params.append(`gender`, employeeSelection.gender.id);
            }
            if (employeeSelection.chart) {
                params.append(`chart_id`, employeeSelection.chart.id);
            }
            if (employeeSelection.groups && employeeSelection.groups.length > 0) {
                employeeSelection.groups.forEach((item, index) => {
                    params.append(`group_ides[${index}]`, item.id);
                });
            }
        } else {
            employeeSelection.employees.forEach((item, index) => {
                params.append(`employee_ides[${index}]`, item.id);
            });
        }
        values.budgets.forEach((item, index) => {
            if (item.amount) {
                params.append(`budgets[${index}][category_id]`, item.category ? item.category.id : null);
                params.append(`budgets[${index}][amount]`, item.amount);
            }
        });
        await organizationService
            .create(`assigns/budget?${params.toString()}`)
            .then((res) => {
                onAllocate();
            })
            .catch((err) => {});

        setLoading({ allocate: false });
    };

    return (
        <DDialogWrapper open bodyStyles={{ padding: '28px 38px 40px 38px' }} onClose={onClose}>
            <Grid container>
                <Grid item xs={12}>
                    <DDialogHeader title="آیا از تخصیص اعتبار رفاهی اطمینان دارید؟" showCloseBtn={false} />
                </Grid>
                <Grid item xs={12} mt="40px">
                    <Grid container rowSpacing="20px" sx={{ borderTop: '1px solid rgba(238, 238, 238, 1)' }}>
                        <Grid item xs={12} mt="18px">
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {topTableColumns.map((column, index) => {
                                            return (
                                                <TableCell style={tableHeadStyle} key={`top-table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values.budgets.map((budget, index) => (
                                        <TableRow key={`table-row-${index}`}>
                                            {index === 0 && (
                                                <DTableCell border={{ border: 'none' }} rowspan={values.budgets.length}>
                                                    {employeeSelection.count} نفر
                                                </DTableCell>
                                            )}
                                            <DTableCell border={{ borderRight: '1px solid rgb(217, 217, 217)' }}>
                                                {budget.category ? budget.category.name : 'دسته‌بندی آزاد'}
                                            </DTableCell>
                                            <DTableCell>{(+budget.amount).toLocaleString()} تومان</DTableCell>
                                            {/* <DTableCell>{sum.toLocaleString()} تومان</DTableCell> */}
                                            {/* <DTableCell>{(account.wallet.amount - sum).toLocaleString()} تومان</DTableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {bottomTableColumns.map((column, index) => {
                                            return (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <DTableCell>{account.wallet.remain.toLocaleString()} تومان</DTableCell>
                                        <DTableCell>{sum} تومان</DTableCell>
                                        <DTableCell>{(sum * employeeSelection.count).toLocaleString()} تومان</DTableCell>

                                        <DTableCell>
                                            {(account.wallet.remain - sum * employeeSelection.count).toLocaleString()} تومان
                                        </DTableCell>
                                    </TableRow>
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12} mt="15px" sx={{ display: 'flex', gap: '24px', justifyContent: 'flex-end' }}>
                            <LoadingButton
                                loading={loading.allocate}
                                variant="contained"
                                sx={{ fontSize: '14px', minWidth: '140px' }}
                                onClick={() => handleSubmit()}>
                                تخصیص
                            </LoadingButton>
                            <Button variant="contained" color="brandWarning" sx={{ fontSize: '14px' }} onClick={onClose}>
                                لغو
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DDialogWrapper>
    );
};
const bottomTableColumns = [
    { title: 'موجودی کیف پول' },
    { title: 'مجموع مبلغ تخصیص یافته به ازای هر نفر' },
    { title: 'مجموع کل' },
    { title: 'باقی مانده موجودی کیف پول' },
];
const topTableColumns = [
    { title: 'تعداد کارمندان' },
    { title: 'دسته بندی' },
    { title: 'مبلغ برای هر نفر (تومان)' },
    // { title: 'توضیحات' },
    // { title: 'ارسال پیامک' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export { OrgAllocateFinalCreditCheck };
