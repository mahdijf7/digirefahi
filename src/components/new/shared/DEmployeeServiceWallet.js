import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';

const DEmployeeServiceWallet = ({ wallets }) => {
    const { t } = useTranslation();

    return (
        <DBox sx={{ mb: '34px', p: '18px 30px 18px 40px', flexDirection: 'row' }}>
            <Typography fontSize="20px" sx={{ ml: 'auto' }}>
                اطلاعات کیف پول
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                {wallets.wallets.map((wallet) => (
                    <Box sx={walletItemStyles} position="relative" minWidth="260px">
                        <Box bgcolor={wallet.color} sx={walletColoredpartStyles}></Box>
                        <Typography component="p" fontSize="12px">
                            {wallet.name}
                        </Typography>
                        <Typography component="p" className="flex" gap=".5rem" fontSize="12px">
                            {wallet.remain.toLocaleString()}
                            <Typography component="span" fontSize="10px">
                                {t('dashboard.toman')}
                            </Typography>
                        </Typography>
                    </Box>
                ))}
                <Box sx={walletItemStyles} position="relative" minWidth="260px">
                    <Box bgcolor="#CE6ADE" sx={walletColoredpartStyles}></Box>
                    <Typography component="p" fontSize="12px">
                        موجودی کیف پول
                    </Typography>
                    <Typography component="p" className="flex" gap=".5rem" fontSize="12px">
                        {wallets.total_remain.toLocaleString()}
                        <Typography component="span" fontSize="10px">
                            {t('dashboard.toman')}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </DBox>
    );
};
const walletItemStyles = {
    height: '32px',
    p: '0 20px',
    overflow: 'hidden',
    borderRadius: '10px',
    border: '1px solid #EEEEEE ',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};
const walletColoredpartStyles = {
    height: '100% !important',
    position: 'absolute',
    top: '0',
    right: '0',
    width: '10px',
    borderLeft: '1px solid #eeeeee',
};
export { DEmployeeServiceWallet };
