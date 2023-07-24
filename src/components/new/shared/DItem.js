import { Box, Typography, AspectRatio } from '@mui/material';

// Componenets
import DBox from 'components/new/shared/DBox';
import { Link } from 'react-router-dom';

const DItem = ({ name, image, to = '' }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <DBox style={boxStyles}>
                <Box sx={imWrapperStyles}>
                    <img src={`${process.env.REACT_APP_STORAGE_URL}/${image}`} alt={name} />
                </Box>
                <Box sx={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', p: '0 20px' }}>
                    <Typography noWrap={true} color="common.black" sx={{ fontSize: '18px' }}>
                        {name}
                    </Typography>
                </Box>
            </DBox>
        </Link>
    );
};
const boxStyles = { overflow: 'hidden', '& img': { height: '110px' } };
const imWrapperStyles = {
    // height: '110px',
    width: '100%',
    display: 'flex',
    aspectRatio: '1 / 1',
    boxShadow: '0 0 12px 3px rgba(0, 0, 0, 0.05)',
    '& img': { height: '100%', width: '100%', objectFit: 'cover' },
};
// const imWrapperStyles = {
//     // height: '110px',
//     width: '100%',
//     display: 'flex',
//     position: 'relative',
//     boxShadow: '0 0 12px 3px rgba(0, 0, 0, 0.05)',
//     '&:before': {
//         content: `''`,
//         display: 'block',
//         pt: '66%',
//     },
//     '& img': { width: '100%', objectFit: 'cover', height: '100%' },
// };
export { DItem };
