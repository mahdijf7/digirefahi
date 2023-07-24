import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import AdminOrgEditGroupSelectedEmployees from './AdminOrgEditGroupSelectedEmployees';
import AdminOrgEditGroupEmployees from './AdminOrgEditGroupEmployees';

const AdminOrgEditGroup = ({ groupId, onClose, onSave }) => {
    const [loading, setLoading] = useState({ initial: true, save: false });
    const [group, setGroup] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { t } = useTranslation();
    const { companyId } = useParams();

    const update = async (values) => {
        if (loading.save) return;
        setLoading({ ...loading, save: true });

        const params = new URLSearchParams();
        params.append('company_id', companyId);
        params.append('_method', 'PUT');
        if (values.name) params.append('name', values.name);
        selectedEmployees.forEach((employee, index) => params.append(`employee_ides[${index}]`, employee.id));

        await adminService
            .update(`groups/${group.id}?${params.toString()}`)
            .then((res) => {
                onSave();
            })
            .catch((err) => {
                console.log('error occured!');
            });

        setLoading({ ...loading, save: false });
    };

    const employeeDeleteHandler = (employee) => {
        setSelectedEmployees(selectedEmployees.filter((item) => item.id !== employee.id));
    };
    const employeeToggleHandler = (employee) => {
        const employeeAlreadySelected = selectedEmployees.find((item) => item.id === employee.id);
        if (employeeAlreadySelected) {
            setSelectedEmployees(selectedEmployees.filter((item) => item.id !== employee.id));
        } else {
            setSelectedEmployees([...selectedEmployees, employee]);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await adminService
                .get(`groups/${groupId}`, { signal })
                .then((res) => {
                    setGroup(res.data.data);
                    setSelectedEmployees(res.data.data.employees);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading({ ...loading, initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DDialogWrapper open onClose={onClose}>
            <DLoadingWrapper sx={{ pt: '20px' }} loading={loading.initial}>
                {group && (
                    <Formik initialValues={group} onSubmit={update}>
                        <Form>
                            <Grid container>
                                <Grid item xs={4} sx={{ display: 'grid' }}>
                                    <CustomInputBase name="name" placeholder={t('groupName')} weight hasDefaultStyle />
                                </Grid>
                                <Grid item xs={8} sx={{ display: 'grid' }}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                        <HighlightOffIcon
                                            fontSize="large"
                                            sx={{ color: '#147ec1', cursor: 'pointer' }}
                                            onClick={onClose}
                                        />
                                    </Box>
                                </Grid>

                                <AdminOrgEditGroupSelectedEmployees
                                    employees={selectedEmployees}
                                    onDelete={employeeDeleteHandler}
                                />
                                <AdminOrgEditGroupEmployees
                                    selectedEmployees={selectedEmployees}
                                    onEmployeeToggle={employeeToggleHandler}
                                />

                                <Grid item xs={12} mt="26px">
                                    <LoadingButton
                                        loading={loading.save}
                                        variant="contained"
                                        type="submit"
                                        sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                        ویرایش گروه
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                )}
            </DLoadingWrapper>
        </DDialogWrapper>
    );
};

export default AdminOrgEditGroup;
