import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Utils
import adminService from 'service/api/adminService';
import ChartContext from '../chart-context';
import ChartEmployeesHeader from './ChartEmployeesHeader';
import theme from 'assets/theme';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import ChartEmployeeListItem from './ChartEmployeeListItem';

const tableColumns = [{ title: 'نام و نام خانوادگی' }, { title: 'کد ملی' }, { title: 'شماره موبایل' }, { title: 'چارت سازمانی' }];
const Chart = ({}) => {
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

        await adminService
            .get(`employees-export?${params}`)
            .then((res) => {
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_STORAGE_URL}/${res.data.data}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => {
           
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
            params.append('company_id', companyId);
            params.append('chart_id', selectedNode.id);
            params.append('page', page);

            await adminService
                .get(`employees?${params}`, { signal })
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setLoading({ refresh: false, initial: false });
                })
                .catch((err) => {
                
                });
        };

        if (selectedNode?.id) {
            getEmployees();
        }

        return () => controller && controller.abort();
    }, [selectedNode, page]);

    return (
        <Box className={loading.refresh && 'box--isLoading'}>
            {selectedNode?.id && (
                <>
                    <DLoadingWrapper sx={{ mt: '36px' }} loading={loading.initial}>
                        <>
                            <ChartEmployeesHeader />

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
                                    {employees.length > 0 ? (
                                        employees.map((employee, index) => (
                                            <ChartEmployeeListItem
                                                employee={employee}
                                                key={employee.id}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty />
                                    )}
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
                        </>
                    </DLoadingWrapper>
                </>
            )}
        </Box>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default Chart;
