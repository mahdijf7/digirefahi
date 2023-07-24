import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DAutoCompleteButton = ({ formControlStyle, label, isOpen, isSelected, isDisabled, hasError, multiple, value, onOpen }) => {
    const badgeStyles = {
        minWidth: '18px',
        height: '18px',
        borderRadius: '3px',
        backgroundColor: '#0877BD !important',
        marginRight: '12px',
        color: '#fff !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        padding: ' 0 2px',
        ...formControlStyle?.badge,
    };

    return (
        <Box
            className={[isSelected && 'selected', isDisabled && 'disabled', hasError && 'hasError']}
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: ' 0 22px 0 18px',
                zIndex: 1,
                backgroundColor: '#fff',
                border: '1px solid #D9D9D9',
                borderRadius: '6px',
                cursor: 'pointer',
                '&.selected': {
                    border: '1px solid inherit',
                    color: 'inherit',
                },
                '&.disabled': {
                    opacity: 0.8,
                    cursor: 'context-menu',
                },
                '&.hasError, &.hasError:hover': {
                    border: '1px solid #d32f2f',
                },
                '&:not(.disabled):hover': { borderColor: 'black' },
                ...formControlStyle,
            }}
            onClick={onOpen}>
            <Typography fontSize="13px" noWrap>
                {label}{' '}
            </Typography>

            {/* show this badge on multiple type */}
            {multiple && value && value.length > 0 && <Box sx={badgeStyles}>{value.length}</Box>}

            {/* arrow up & down */}
            {isOpen ? (
                <KeyboardArrowUpIcon sx={{ marginRight: 'auto', fontSize: '24px' }} />
            ) : (
                <KeyboardArrowDownIcon sx={{ marginRight: 'auto', fontSize: '24px' }} />
            )}
        </Box>
    );
};

export default DAutoCompleteButton;
