import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DSelectButton = ({ formControlStyle, label, isOpen, isSelected, multiple, value, onOpen }) => {
    return (
        <Box
            className={isSelected && 'selected'}
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
                '&:hover': { borderColor: 'black' },
                ...formControlStyle,
            }}
            onClick={onOpen}>
            <Typography fontSize="13px"> {label} </Typography>

            {/* show this badge on multiple type */}
            {multiple && value.length > 0 && <Box sx={badgeStyles}>{value.length}</Box>}

            {/* arrow up & down */}
            {isOpen ? (
                <KeyboardArrowUpIcon sx={{ marginRight: 'auto', fontSize: '24px' }} />
            ) : (
                <KeyboardArrowDownIcon sx={{ marginRight: 'auto', fontSize: '24px' }} />
            )}
        </Box>
    );
};

const badgeStyles = {
    width: '18px',
    height: '18px',
    borderRadius: '3px',
    backgroundColor: '#0877BD',
    marginRight: '20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
};
export default DSelectButton;
