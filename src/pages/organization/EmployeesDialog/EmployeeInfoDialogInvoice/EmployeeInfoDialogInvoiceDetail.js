import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import EmployeeInfoDialogInvoiceDetailT1 from './EmployeeInfoDialogInvoiceDetailT1';
import EmployeeInfoDialogInvoiceDetailT2 from './EmployeeInfoDialogInvoicdDetailT2';

import organizationService from 'service/api/organization.service';

function BasicModal({ invoiceId, open, handleOpen, handleClose, data }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [transactions, setTransaction] = useState({});

    const getTransactions = async (invoiceId) => {
        setLoading(true);
        await organizationService
            .get(`orders/${invoiceId}`)
            .then((res) => {
                setLoading(false);
                setTransaction(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        invoiceId && getTransactions(invoiceId);
    }, [invoiceId]);

    return (
        <div>
            <DDialogWrapper size="sg" open={open} onClose={handleClose}>
                <Box position="relative">
                    <DLoadingWrapper loading={loading}>
                        <DDialogHeader title="فاکتور خرید خدمت" onClose={handleClose} />
                        <Box
                            position="absolute"
                            top="-.5rem"
                            right="20rem"
                            gap="2rem"
                            className="flex"
                            bgcolor="primary.light"
                            height="3.6rem"
                            minWidth="5rem"
                            maxWidth="17rem"
                            px="2rem">
                            <Typography color="primary.main">شماره فاکتور </Typography>
                            <Typography color="primary.main">{transactions?.number}</Typography>
                        </Box>
                        <Divider sx={{ my: '2rem' }} />
                        <EmployeeInfoDialogInvoiceDetailT1 transactions={transactions} />
                        <EmployeeInfoDialogInvoiceDetailT2 transactions={transactions} />
                    </DLoadingWrapper>
                </Box>
            </DDialogWrapper>
        </div>
    );
}

export default React.memo(BasicModal);
