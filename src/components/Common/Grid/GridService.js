import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/dashboard.scss';
// import Img from 'assets/image/imageProduct.png';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function GridService({ service, list }) {
    const navigate = useNavigate();
 

    return (
        <Grid container spacing="2rem" justifyContent="space-between">
            {service.map((list, index) => (
                <Grid alignSelf="flex-end" sx={style} key={index + list.id} item xs={10} sm={3.8}>
                    <Box borderRadius="1.4rem" boxShadow={1} minHeight="20.9rem" onClick={() => navigate(list.id)}>
                        <Box sx={imgStyle}>{list.thumbnail && <img src={`${BASE_URL}/${list.thumbnail}`} alt="" />}</Box>
                        <Box className="flex" borderRadius="1.4rem" height="6.2rem" bgcolor="common.white">
                            <Typography textAlign="center" variant="h3">
                                {list.name}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
const style = {
    cursor: 'pointer',
    '&:hover': {
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: ' scale(1.1)',
    },
    '&:active': {
        transform: ' scale(1)',
    },
};

const imgStyle = {
    borderRadius: '1.4rem 1.4rem 0 0',
    height: '16rem',
    bgcolor: 'primary.main',
    '& img': {
        width: '100%',
        height: '16rem',
        borderRadius: '1.4rem 1.4rem 0 0',
    },
};

export default GridService;
