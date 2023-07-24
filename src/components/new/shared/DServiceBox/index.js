import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Assets
import theme from 'assets/theme';

const DServiceBox = ({ tag = 'link', service, to, isActive = false, isDisabled = false, small = false, onBoxClicked }) => {
    const { name, image, supplier, price, description, id } = service;
    const styles = {
        background: '#FEFEFE',
        boxShadow: '0px 0px 6px 2px rgba(0, 0, 0, 0.05)',
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'all 0.3s',
        color: '#000000',
        position: 'relative',

        '&.d-serviceBox--isSmall': {
            '& .d-serviceBox__summary': {
                padding: '8px 10px 10px 10px',
            },
            '& .d-serviceBox__description': {
                mt: '0px',
            },
            '& .d-service-box__supplier': {
                mt: '0px',
            },
        },

        ' &.d-serviceBox--isDisabled::before': {
            content: `''`,
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: '#ffffffc9',
            cursor: 'not-allowed',
            zIndex: '10',
        },

        '&:hover, &.d-serviceBox--isActive': {
            background: theme.main.palette.primary.main,
            color: '#fff !important',
            '& .d-service-box__supplier, & .d-service-box__price': {
                color: '#fff !important',
            },
        },
    };
    const summaryStyles = {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 20px 20px 20px',
    };
    const imageContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '3 / 2',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    };
    const descriptionStyles = {
        fontSize: '12px',
        mt: '6px',
    };

    const boxClicked = () => {
        onBoxClicked && !isDisabled && onBoxClicked(service);
    };

    const sharedContent = (
        <Box
            sx={styles}
            className={[
                isActive && 'd-serviceBox--isActive',
                isDisabled && 'd-serviceBox--isDisabled',
                small && 'd-serviceBox--isSmall',
            ]}>
            <Box sx={imageContainerStyles}>
                <img src={`${process.env.REACT_APP_STORAGE_URL}/${image}`} />
            </Box>
            <Box className="d-serviceBox__summary" sx={summaryStyles}>
                <Typography noWrap={true}>{name}</Typography>
                <Typography className="d-serviceBox__description" sx={descriptionStyles} noWrap={true}>
                    {description}
                </Typography>
                <Typography
                    className="d-service-box__supplier"
                    component="span"
                    sx={{
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        mt: '10px',
                        color: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <StorefrontIcon />
                    {supplier}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', mt: '8px' }}>
                    <Typography
                        className="d-service-box__price"
                        sx={{
                            color: theme.main.palette.primary.main,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}>
                        {(+price).toLocaleString()}{' '}
                        <Typography component="span" sx={{ fontSize: '10px', fontWeight: 600 }}>
                            تومان
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
    return tag === 'link' ? (
        <Link style={{ textDecoration: 'none', width: '100%', display: 'grid' }} to={to}>
            {sharedContent}
        </Link>
    ) : (
        <Box style={{ textDecoration: 'none', width: '100%', display: 'grid', cursor: 'pointer' }} onClick={() => boxClicked()}>
            {sharedContent}
        </Box>
    );
};

export default DServiceBox;
