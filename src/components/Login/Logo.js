import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import '../../assets/style/login.scss';
import { isEmpty } from 'lodash';
// logo

const Logo = (props) => {
    const { title, img, sx, xs = 12, sm = 6 } = props;
    const { t } = useTranslation();
    return (
        <Grid sx={sx} item sm={sm} xs={xs} className="loginLogo">
            <img src={img} alt="logo" className="logotypeImage"  />
            {title && (
                <Typography color="primary.dark" textAlign="center" fontSize="3rem" component="h2">
                    {t(title)}
                </Typography>
            )}
        </Grid>
    );
};

export default Logo;
