import { useState } from 'react';
import { TableRow, Box, Switch, FormControlLabel, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/material/styles';

// Components
import DMoreButton from 'components/new/shared/DMoreButton';
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrgGroupItem = ({ group, onDelete, onEdit, onChangeStatus, ...props }) => {
    const { id, name, employee_count, status } = group;
    const [checked, setChecked] = useState(status === 'ACTIVE');

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChangeStatus(id, event.target.checked);
    };

    return (
        <TableRow style={props.style}>
            <DTableCell>{name || '---'}</DTableCell>
            <DTableCell>{id || '---'}</DTableCell>
            <DTableCell>{employee_count || '---'}</DTableCell>
            <DTableCell>
                <FormControlLabel control={<Android12Switch name="123" checked={checked} onChange={handleChange} />} />
            </DTableCell>
            <DTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                    <DMoreButton onClick={() => onEdit(group)} />

                    <Button
                        color="brandOrange"
                        sx={{ minWidth: 'auto' }}
                        disabled={employee_count > 0}
                        onClick={() => onDelete(group)}>
                        <DeleteOutlineIcon fontSize="large" />
                    </Button>
                </Box>
            </DTableCell>
        </TableRow>
    );
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

export default OrgGroupItem;
