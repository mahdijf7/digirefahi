import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, Formik, FieldArray } from 'formik';

// Utils
import OrganizationService from 'service/api/organization.service';
import AuthContext from 'store/Auth-context';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import OrgAllocateEmployeeSelection from 'components/new/pages/organization/allocate/OrgAllocateEmployeeSelection';
import OrgAllocateCredit from 'components/new/pages/organization/allocate/OrgAllocateCredit';
import { OrgAllocateService } from 'components/new/pages/organization/allocate/OrgAllocateService';
import { OrgAllocateFinalCreditCheck } from 'components/new/pages/organization/allocate/OrgAllocateFinalCreditCheck';
import { OrgAllocateFinalServiceCheck } from 'components/new/pages/organization/allocate/OrgAllocateFinalServiceCheck';
import { OrgAllocateFinalMessage } from 'components/new/pages/organization/allocate/OrgAllocateFinalMessage';

const breadCrumbLinks = [{ path: '/app/organization/dashboard/', title: 'پیشخوان' }, { title: 'تخصیص رفاهی' }];

const Allocation = ({}) => {
    const navigate = useNavigate();
    const { account } = useContext(AuthContext);
    const [loading, setLoading] = useState({ allocate: false });
    const [employeeSelection, setEmployeeSelection] = useState({ count: 0 });
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const [creditDialogIsOpen, setCreditDialogIsOpen] = useState(false);
    const [serviceDialogIsOpen, setServiceDialogIsOpen] = useState(false);
    const [finalAlertDialogIsOpen, setFinalAlertDialogIsOpen] = useState(false);
    const [formkiValues, setFormkiValues] = useState({});

    const serviceAllocationHandler = () => {
        setServiceDialogIsOpen(false);
        setFinalAlertDialogIsOpen(true);
    };
    const creditAllocationHandler = () => {
        setCreditDialogIsOpen(false);
        setFinalAlertDialogIsOpen(true);
    };
    const setEmployeeSelectionHandler = (data) => {
        setEmployeeSelection(data);
    };
    const noEmployeeWaSelected = () => {
        return (
            !employeeSelection.selectAll &&
            (!employeeSelection.employees || (employeeSelection.employees && employeeSelection.employees.length === 0))
        );
    };
    const noCreditAllocationHasBeenDefined = (budgets) => {
        return (
            budgets.reduce((f, c) => {
                if (+c.amount) f += +c.amount;
                return f;
            }, 0) <= 0
        );
    };
    const allocatedCreditIsMoreThanWallet = (budgets) => {
        const sumOfAssignedCredits = budgets.reduce((f, c) => {
            if (+c.amount) f += +c.amount;
            return f;
        }, 0);
        return account?.wallet && sumOfAssignedCredits > account.wallet.remain;
    };
    const filter = async (values) => {
        console.log(employeeSelection, 123);

        let errorMessage = false;
        // atleast one of the employees should be selected
        if (noEmployeeWaSelected()) {
            errorMessage = 'حداقل یک کارمند باید انتخاب شده باشد.';
        } else if (values.type === 'credit' && noCreditAllocationHasBeenDefined(values.budgets)) {
            errorMessage = 'برای تخصیص اعتبار رفاهی ابتدا مبلغی تعیین کنید.';
        } else if (values.type === 'credit' && allocatedCreditIsMoreThanWallet(values.budgets)) {
            errorMessage = ' مجموع مبلغ تخصیص یافته نباید از موجودی کیف پول بیشتر باشد.';
        }
        // atleast one of the provided services should be selected
        else if (values.type === 'service' && !values.selectedService) {
            errorMessage = 'سرویس موردنظر خود را انتخاب کنید.';
        }

        if (errorMessage) {
            setSnackBarData({
                show: true,
                data: {
                    text: errorMessage,
                    type: 'error',
                },
            });
            return;
        }

        setFormkiValues(() => values);

        if (values.type === 'credit') {
            setCreditDialogIsOpen(true);
        } else if (values.type === 'service') {
            setServiceDialogIsOpen(true);
        }
        return;
    };

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />

            <OrgAllocateEmployeeSelection onEmployeeToggled={setEmployeeSelectionHandler} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    smsText: '',
                    sms: false,
                    employeeSelectionType: '',
                    type: 'credit',
                    budgets: [{ amount: '', category: null }],
                }}
                onSubmit={filter}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <RadioGroup
                            value={values.type}
                            name="type"
                            onChange={(e) => {
                                setFieldValue('budgets', [{ amount: '', category: null }]);
                                setFieldValue('selectedService', undefined);
                                setFieldValue('type', e.target.value);
                            }}>
                            <Grid container mt="30px">
                                <Grid item xs={12}>
                                    <DBox sx={{ pt: '30px', pb: '50px' }}>
                                        <OrgAllocateCredit values={values} employeeCount={employeeSelection.count} />

                                        <OrgAllocateService values={values} employeeCount={employeeSelection.count} />
                                        <Grid container>
                                            <Grid item xs={3} mx="auto">
                                                <LoadingButton
                                                    loading={loading.allocate}
                                                    fullWidth
                                                    color="brandWarning"
                                                    variant="contained"
                                                    size="large"
                                                    type="submit"
                                                    sx={{ fontSize: '16px' }}>
                                                    تخصیص رفاهی
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </DBox>
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </Form>
                )}
            </Formik>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />

            {creditDialogIsOpen && (
                <OrgAllocateFinalCreditCheck
                    values={formkiValues}
                    employeeSelection={employeeSelection}
                    onClose={() => {
                        setCreditDialogIsOpen(false);
                    }}
                    onAllocate={() => {
                        creditAllocationHandler();
                    }}
                />
            )}

            {serviceDialogIsOpen && (
                <OrgAllocateFinalServiceCheck
                    values={formkiValues}
                    employeeSelection={employeeSelection}
                    onClose={() => {
                        setServiceDialogIsOpen(false);
                    }}
                    onAllocate={() => {
                        serviceAllocationHandler();
                    }}
                />
            )}

            {finalAlertDialogIsOpen && (
                <OrgAllocateFinalMessage
                    text={
                        formkiValues.type === 'service'
                            ? 'خدمت سازمانی با موفقیت تخصیص داده شد.'
                            : 'تخصیص اعتبار رفاهی با موفقیت انجام شد.'
                    }
                    onClose={() => {
                        setFinalAlertDialogIsOpen(false);
                        navigate('/app/organization/dashboard/');
                    }}
                />
            )}
        </DashboardCard>
    );
};

export default Allocation;
