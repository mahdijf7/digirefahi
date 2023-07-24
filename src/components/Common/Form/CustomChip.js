import { Chip, Box, IconButton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExitChip from 'assets/icone/svg/ExitChip';

const CustomChip = ({ labelKey = 'name', handleDeleteChip, chipOption, chipStyle, ...otherProps }) => {
    const CustomChip = styled(Chip)(({ theme }) => ({
        '& button': {
            marginLeft: '.3rem !important',
        },
        display: 'flex',
        justifyContent: 'space-between',
        width: 'auto',
        borderRadius: '.6rem !important',
        height: '2.8rem',
        backgroundColor: theme.palette.primary.light,
        border: `.1rem solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        fontWeight: '700',
        fontSize: '1.1rem',
        padding: '0 !important',
        margin: '0 !important',
        ...chipStyle,
    }));

    return (
        <Box display="flex" flexWrap="wrap" gap="1rem" {...otherProps}>
            {chipOption &&
                chipOption.map((option, index) => (
                    <CustomChip
                        key={`${option.id}-${index}`}
                        label={option[labelKey]}
                        onDelete={() => handleDeleteChip(option)}
                        deleteIcon={
                            <IconButton>
                                <ExitChip />
                            </IconButton>
                        }
                    />
                ))}
        </Box>
    );
};

export default CustomChip;
