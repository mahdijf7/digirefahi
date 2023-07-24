import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableBody, TableCell, TableRow, TableHead } from '@mui/material';

//components
import ModalServiceList from 'components/Modal/ModalServiceList';

//api service
import adminService from 'service/api/adminService';

// styles
import theme from 'assets/theme';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PriceSort from 'assets/icone/svg/Admin/PriceSort';
import ServiceListTableBody from './ServiceListTableBody';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DSnackbar from 'components/new/shared/DSnackbar';

function createData({ status, name, thumbnail, type, category, price, value }) {
    return { status, name, thumbnail, type, category, price, value };
}

function ServiceListTable({ page, open, setOpen, content, getServiceList, setLoading }) {
    const [selectedService, setSelectedService] = useState(null);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const tableColumns = [
        { title: 'newService.activeDeactive', icon: <KeyboardArrowDownIcon /> },
        { title: 'newService.serviceTitle' },
        { title: 'newService.serviceType' },
        { title: 'newService.category' },
        { title: 'newService.priceToman', icon: <PriceSort /> },
        { title: 'newService.numberOfInventory', icon: <PriceSort /> },
        { title: 'newService.actions' },
    ];

    const { t } = useTranslation();

    content.map((item) => createData(item));

    console.log(content,888777);

    const handleEditService = (service) => {
        setSelectedService(service);
        setOpen(true);
    };

    const changeServiceStatus = async (groupId, isChecked) => {
        setLoading({
            initial: false,
            refresh: true,
        });
        await adminService
            .getChangeServiceStatus(groupId, isChecked ? 'ACTIVE' : 'DEACTIVATE')
            .then((res) => {
                setLoading({
                    initial: false,
                    refresh: false,
                });
                getServiceList(page);
            })
            .catch((err) => {
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };

    return (
        <>
            <DTableWrapper>
                <TableHead>
                    <TableRow>
                        {tableColumns.map((column, index) => {
                            return (
                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                    {t(column.title)}
                                    {column?.icon}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.length > 0 ? (
                        content.map((row, index) => (
                            <ServiceListTableBody
                                open={open}
                                style={{
                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                }}
                                row={row}
                                key={row.id}
                                page={page}
                                handleEditService={handleEditService}
                                getServiceList={getServiceList}
                                changeServiceStatus={changeServiceStatus}
                            />
                        ))
                    ) : (
                        <DTableEmpty />
                    )}
                </TableBody>
            </DTableWrapper>
            <ModalServiceList
                snackBarData={snackBarData}
                setSnackBarData={setSnackBarData}
                page={page}
                open={open}
                getServiceList={getServiceList}
                selectedService={selectedService}
                setOpen={setOpen}
            />
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
}

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',

    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default ServiceListTable;
