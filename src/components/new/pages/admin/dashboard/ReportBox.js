import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';

// Assets
import theme from 'assets/theme';

const Theme = {
    LightBlue: 'LightBlue',
    DarkBlue: 'DarkBlue',
};
const BtnIconSvg = require('../../../../../assets/icone/reportBoxBtnIcon.svg').default;

const ReportBox = (props) => {
    const { icon, title, number, linkText, linkPath, hideLink = false, isPrice } = props.data;
    const theme = props.theme || Theme.DarkBlue;

    return (
        <Grid item sm={12 / 5}>
            <DBox sx={ReportBoxStyle}>
                <img src={icon || '#'} alt="icon" style={IconStyle} />
                <Typography color="primary.main" sx={TitleStyle}>
                    {title || ''}
                </Typography>
                <Typography color="#004D88" sx={{ ...numberStyle, fontSize: isPrice ? '14px' : '20px' }}>
                    {number || 0}
                    {isPrice && (
                        <Typography component="span" fontSize="12px" fontWeight={600}>
                            تومان
                        </Typography>
                    )}
                </Typography>
                <Link
                    to={linkPath || '#'}
                    style={{
                        ...BtnStyle,
                        backgroundColor: theme === Theme.DarkBlue ? '#004D88' : theme === Theme.LightBlue ? '#0877BD' : 'inherit',
                    }}>
                    <span style={{ ...BtnTextStyle, display: hideLink ? 'none' : 'block' }}>{linkText}</span>
                    <img style={{ display: hideLink ? 'none' : 'flex' }} src={BtnIconSvg} alt="icon" />
                </Link>
            </DBox>
        </Grid>
    );
};

const ReportBoxStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.main.palette.primary.main,
    pt: '10px',
    gap: '8px',
};
const TitleStyle = {
    fontWeight: '600',
    fontSize: '16px',
};
const IconStyle = {
    height: '35px',
    maxHeight: '35px',
};
const numberStyle = {
    fontWeight: '600',
    display: 'flex',
    gap: '4px',
};
const BtnStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0877BD',
    color: '#fff',
    textDecoration: 'none',
    borderBottomLeftRadius: '14px',
    borderBottomRightRadius: '14px',
    padding: '6px 8px 0 8px',
    height: '53px',
};
const BtnTextStyle = {
    fontSize: '12px',
};

export default ReportBox;
