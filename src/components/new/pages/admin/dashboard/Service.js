import { Box, Typography } from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from 'react';
import { Paper } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StarIconSvg = require('../../../../../assets/icone/star.svg').default;

const Service = (props) => {
    const { name, supplier, description, image, price, score, id } = props.data;

    return (
        <Paper variant="outlined" elevation={0} style={ServiceStyle}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: '0 0 80px',
                    height: '54px',
                    overflow: 'hidden',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 6px 2px rgba(0, 0, 0, 0.05)',
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    },
                }}>
                {/*<img src={img || SampleProduct} alt={title}/>*/}
                <img src={`${process.env.REACT_APP_STORAGE_URL}/${image}`} alt={name} />
            </Box>
            <Box sx={{ display: 'flex', flex: 1, gap: '8px', overflow: 'hidden' }}>
                <Box sx={{ flex: 1, display: 'grid' }}>
                    <Typography
                        noWrap
                        style={{
                            textAlign: 'right',
                            fontWeight: '600',
                            fontSize: '12px',
                        }}>
                        {name}
                    </Typography>

                    <Typography
                        noWrap
                        sx={{
                            textAlign: 'right',
                            fontSize: '12px',
                        }}>
                        <Typography
                            noWrap
                            component="span"
                            sx={{
                                textAlign: 'right',
                                fontSize: '12px',
                            }}>
                            {description}
                        </Typography>

                        <span style={{ margin: '0 3px' }}>/</span>
                        {supplier}
                    </Typography>

                    <Typography
                        style={{
                            textAlign: 'right',
                            fontWeight: '600',
                            fontSize: '10px',
                        }}>
                        {price} تومان
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                    <Typography
                        style={{
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}>
                        {score || '-'} <img src={StarIconSvg} alt="icon" />
                    </Typography>
                    <Link
                        to={'/app/admin/service-management/service-list/service-editing/' + id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            gap: '4px',
                            color: '#0877BD',
                            fontSize: '11px',
                            fontWeight: '600',
                            marginTop: 'auto',
                        }}>
                        مشاهده
                        <KeyboardBackspaceIcon />
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

const ServiceStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '5px 0',
    padding: '12px 16px',
    background: '#fff',
    borderRadius: '5px',
    gap: '10px',
};
export default Service;
