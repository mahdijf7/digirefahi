import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Utils
import organizationService from 'service/api/organization.service';
import ChartContext from '../chart-context';
import theme from 'assets/theme';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DBox from 'components/new/shared/DBox';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import OrgChartEmployeeListItem from './OrgChartEmployeeListItem';
import OrgChartEmployeesHeader from './OrgChartEmployeesHeader';

// assets
import noEmployeeImage from 'assets/image/shared/no-employee.png';

const tableColumns = [{ title: 'نام و نام خانوادگی' }, { title: 'کد ملی' }, { title: 'شماره موبایل' }, { title: 'چارت سازمانی' }];
const OrgChartEmployees = ({}) => {
    const [loading, setLoading] = useState({
        refresh: false,
        initial: true,
        excel: false,
    });
    const [employees, setEmployees] = useState([]);
    const { companyId } = useParams();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const { selectedNode } = useContext(ChartContext);

    const controller = new AbortController();
    const signal = controller.signal;

    const downloadExcel = async () => {
        if (loading.excel) return;
        setLoading({ ...loading, excel: true });

        const params = new URLSearchParams();
        params.append('company_id', companyId);
        params.append('chart_id', selectedNode.id);

        await organizationService
            .get(`employees-export?${params}`)
            .then((res) => {
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_STORAGE_URL}/${res.data.data}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => {
                console.log(5555555);
            });

        setLoading({ ...loading, excel: false });
    };

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({ ...loading, refresh: true });

        setPage(() => newPage);
    };

    useEffect(() => {
        if (!loading.refresh) setLoading({ ...loading, initial: true });

        const getEmployees = async () => {
            const params = new URLSearchParams();
            params.append('chart_id', selectedNode.id);
            params.append('page', page);

            await organizationService
                .get(`employees?${params.toString()}`, { signal })
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setLoading({ refresh: false, initial: false });
                })
                .catch((err) => {
                    console.log('error occured!', err);
                });
        };

        if (selectedNode?.id) {
            getEmployees();
        }

        return () => controller && controller.abort();
    }, [selectedNode, page]);

    return selectedNode?.id ? (
        <DBox className={loading.refresh && 'box--isLoading'} sx={{ mt: '20px', pb: '50px' }}>
            <DLoadingWrapper sx={{ mt: '50px' }} loading={loading.initial}>
                <>
                    <OrgChartEmployeesHeader />

                    {employees.length > 0 ? (
                        <Box sx={{ display: 'grid', p: '20px 100px' }}>
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns.map((column, index) => {
                                            return (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.map((employee, index) => (
                                        <OrgChartEmployeeListItem
                                            employee={employee}
                                            key={employee.id}
                                            style={{
                                                backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </DTableWrapper>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '24px' }}>
                                {employees.length > 0 && (
                                    <LoadingButton
                                        variant="outlined"
                                        loading={loading.excel}
                                        sx={{ fontSize: '14px' }}
                                        onClick={downloadExcel}>
                                        خروجی اکسل
                                    </LoadingButton>
                                )}
                                {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '50px' }}>
                            <img src={noEmployeeImage} style={{ maxWidth: '550px' }} />
                        </Box>
                    )}
                </>
            </DLoadingWrapper>
        </DBox>
    ) : (
        ''
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default OrgChartEmployees;
