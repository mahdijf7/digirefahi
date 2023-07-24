import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, Link, IconButton, Box, FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

// styles
import theme from 'assets/theme';
import Edit from 'assets/icone/svg/Admin/Edit';
import EditOutlined from 'assets/icone/svg/Admin/EditOutlined';

function ServiceListTableBody({ handleEditService, row, style, changeServiceStatus }) {
    const { id, name, status, thumbnail, type, category, price, value } = row;

    const [checked, setChecked] = useState(status === 'ACTIVE');
    const { t } = useTranslation();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        changeServiceStatus(id, event.target.checked);
    };

    const LINK = '/app/admin/service-management/service-list/service-editing/';

    return (
        <TableRow style={style}>
            <DTableCell>
                <FormControlLabel
                    sx={{ m: '0 auto' }}
                    control={<Android12Switch name="123" checked={checked} onChange={handleChange} />}
                />
            </DTableCell>
            <DTableCell>
                <Box className="flex" justifyContent="flex-start" gap="1rem">
                    <img style={tableCellImageStyle} src={process.env.REACT_APP_STORAGE_URL + '/' + thumbnail} alt="" />
                    {name}
                </Box>
            </DTableCell>
            <DTableCell>{type === 'BASIC' ? 'عمومی' : 'سازمانی' || '---'}</DTableCell>
            <DTableCell>{category || '---'}</DTableCell>
            <DTableCell>{price || '---'}</DTableCell>
            <DTableCell>
                <Box m="0 auto" className="flex" justifyContent="space-between" width="65%">
                    {value}
                    <IconButton onClick={() => handleEditService(row)}>
                        <EditOutlined />
                    </IconButton>
                </Box>
            </DTableCell>
            <DTableCell>
                <Link href={`${LINK + id}`}>
                    <IconButton
                        sx={{
                            color: 'primary.main',
                        }}>
                        <Edit />
                        {t('serviceList.edit')}
                    </IconButton>
                </Link>
            </DTableCell>
        </TableRow>
    );
}

export default ServiceListTableBody;

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableCellImageStyle = {
    height: '3.6rem',
    borderRadius: '.4rem',
    boxShadow: ' 0px 0px 6px 2px rgba(0, 0, 0, 0.05)',
};

const Android12Switch = styled(Switch)(({ theme }) => ({
    width: '65px !important',
    height: '32px !important',
    padding: '3px 0 !important',

    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        backgroundColor: '#FFFFFF !important',
        width: 22,
        height: 22,
        margin: '2px 0 !important',
    },
    '& .MuiSwitch-switchBase': {
        padding: '3px !important',
    },
    '& .MuiSwitch-switchBase+.MuiSwitch-track': {
        backgroundColor: '#D7D7D7 !important',
        opacity: '1 !important',
    },
    '& .MuiSwitch-track': {
        borderRadius: '999px !important',
        '&:before, &:after': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        '&:before': {
            content: `'فعال'`,
            left: 12,
            fontSize: 12,
            color: '#fff',
            display: 'none',
        },
        '&:after': {
            content: `"غیرفعال"`,
            right: 6,
            fontSize: 10,
            color: '#FEFEFE',
        },
    },
    '& .Mui-checked+.MuiSwitch-track': {
        backgroundColor: '#75CE79 !important',
        opacity: '1 !important',
        '&:after': {
            display: 'none',
        },
        '&:before': {
            display: 'flex',
        },
    },
    '& .Mui-checked ': {
        transform: 'translateX(38px) !important',
    },
}));
