import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Checkbox, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

const DAutoCompleteOption = ({ option, optionLabelKey, selected, multiple, ...props }) => {
 
    return (
        <Box
            {...props}
            sx={{
                flexGrow: 1,
                display: 'flex',
            }}>
            {multiple && <Checkbox checked={selected} />}
            <Typography noWrap sx={{ fontSize: '12px' }}>
                {option[optionLabelKey]}
            </Typography>
        </Box>
    );
};

export default memo(DAutoCompleteOption);
