import React from 'react';
import { Grid } from '@mui/material';
import Password from '../../assets/icone/svg/Password';
import CustomInputBasePassword from '../Common/Form/CustomInputBasePassword';

function ChangePassword({ t }) {
    return (
        <>
            <Grid mt={'5%'} item xs={10}>
                <CustomInputBasePassword
                    name="password"
                    showlabel="true"
                    icon={<Password />}
                    title={t('login.newPassword')}
                    placeholder={t('login.passwordPlaceholder')}
                />
            </Grid>
            <Grid mt={'5%'} item xs={10}>
                <CustomInputBasePassword
                    name="verify_password"
                    showlabel="true"
                    icon={<Password />}
                    title={t('login.repeatPassword')}
                    placeholder={t('login.passwordPlaceholder')}
                />
            </Grid>
        </>
    );
}

export default ChangePassword;
