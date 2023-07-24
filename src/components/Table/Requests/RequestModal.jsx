import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from 'assets/theme';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const RequestModal = ({ isOpen, onClose, row }) => {
    const { t } = useTranslation();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const handleClose = () => {
        setFile(null);
        setDescription('');
        onClose?.();
    };
    const renderStatus = (status) => {
        if (status === 'pending') return t('requests.pendingStatus');
        else if (status === 'approve') return t('requests.approveStatus');
        else return t('requests.rejectStatus');
    };
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    minWidth: '80%',
                },
            }}>
            <DialogTitle sx={{ direction: 'rtl' }}>
                <Typography variant="h3">{t('requests.requestModalTitle', { name: '' })}</Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Table sx={styleTable} aria-label="request-modal-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">{t('requests.organizationName')}</TableCell>
                                    <TableCell align="center">{t('requests.serviceType')}</TableCell>
                                    <TableCell align="center">{t('requests.supplier')}</TableCell>
                                    <TableCell align="center">{t('requests.unitPrice')}</TableCell>
                                    <TableCell align="center">{t('requests.quantity')}</TableCell>
                                    <TableCell align="center">{t('requests.totalPrice')}</TableCell>
                                    <TableCell align="center">{t('requests.startDate')}</TableCell>
                                    <TableCell align="center">{t('requests.status')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={row?.id} sx={tableStyle}>
                                    <TableCell align="center">{row?.organizationName}</TableCell>
                                    <TableCell align="center">{row?.serviceType}</TableCell>
                                    <TableCell align="center">{row?.supplier}</TableCell>
                                    <TableCell align="center">{Number(row?.unitPrice | 0).toLocaleString('IRR')}</TableCell>
                                    <TableCell align="center">{row?.quantity}</TableCell>
                                    <TableCell align="center">{Number(row?.totalPrice | 0).toLocaleString('IRR')}</TableCell>
                                    <TableCell align="center">
                                        {!isEmpty(row?.startDate) ? new Date(row?.startDate).toLocaleDateString('IR-fa') : '-'}
                                    </TableCell>
                                    <TableCell align="center">{renderStatus(row?.status)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid xs={12} item>
                        <Stack spacing={1.25} direction="row" sx={{ direction: 'rtl' }}>
                            <InputLabel htmlFor="uploadFile">{t('requests.uploadFileLabel')} :</InputLabel>
                            <TextField
                                id="uploadFile"
                                name="uploadFile"
                                value={file}
                                onChange={(file) => {
                                    setFile(file);
                                }}
                                sx={{ display: 'none' }}
                            />
                            <LoadingButton
                                sx={{ marginRight: '10px !important' }}
                                loading={false}
                                type="button"
                                variant="contained"
                                startIcon={<AttachFileIcon sx={{ ml: 1, fontSize: '1.2rem !important' }} />}
                                onClick={() => document.getElementById('uploadFile').click()}>
                                {t('requests.uploadFile')}
                            </LoadingButton>
                        </Stack>
                    </Grid>
                    <Grid xs={12} item>
                        <Stack spacing={1.25} sx={{ direction: 'rtl' }}>
                            <InputLabel htmlFor="description">{t('requests.description')}</InputLabel>
                            <TextField
                                id="description"
                                name="description"
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                                multiline
                                rows={4}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid xs={12} item>
                        <Divider />
                    </Grid>
                    <Grid xs={12} item sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={1.25}>
                            {row?.status !== 'rejected' && (
                                <Button type="button" variant="contained" color="warning">
                                    {t('requests.rejectRequest')}
                                </Button>
                            )}
                            {row?.status !== 'approve' && (
                                <LoadingButton loading={false} variant="contained" color="primary" onClick={() => {}}>
                                    {t('requests.acceptRequest')}
                                </LoadingButton>
                            )}
                            {row?.status !== 'pending' && (
                                <Button type="button" variant="outlined" color="primary">
                                    {t('requests.closeRequest')}
                                </Button>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
const styleTable = {
    // width: '300px',
    direction: 'rtl',
    '& .MuiTableCell-root': {
        border: `.1rem solid  ${theme.main.palette.background.lightDark} `,
        py: '1rem',
        fontSize: '1.4rem',
        fontWeight: 400,
    },
    '& .MuiTableHead-root': {
        bgcolor: 'primary.light',
        height: '4.5rem',
    },
};

const tableStyle = {
    '& .MuiTableCell-root': {
        height: '6rem',
        '&:not(:last-child)': {
            borderLeft: `.1rem solid  ${theme.main.palette.background.lightDark} `,
        },
    },
    '&:nth-of-type(odd)': {
        backgroundColor: 'background.light',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'background.default',
    },
    '&:last-child td, &:last-child th': {},
};

export default RequestModal;
