import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';

// Utils
import { getErrorTranslation } from 'utils/helpers';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';

const OrgAllocateFinalMessage = ({ text, onClose }) => {
    const { t } = useTranslation();

    return (
        <DDialogWrapper size="sm" open bodyStyles={{ padding: '28px 38px 40px 38px' }} onClose={onClose}>
            <Grid container>
                <Grid item xs={12}>
                    <DDialogHeader onClose={onClose} />
                </Grid>
                <Grid item xs={12} sx={{ mt: '6px', display: 'flex', justifyContent: 'center' }}>
                    <Typography fontSize="18px" fontWeight={600}>
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </DDialogWrapper>
    );
};

export { OrgAllocateFinalMessage };
