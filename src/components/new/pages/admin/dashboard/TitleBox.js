import DBox from '../../../shared/DBox';
// Assets
import { Link } from 'react-router-dom';
import React from "react";
import {Button, Grid} from "@mui/material";

const TitleBox = ({ sx, children, ...props }) => {
    const { title, linkText, linkPath, hideLink=false } = props.data;
    const btnTop = props.btnTop || false;

    return (
        <DBox sx={sx}>
            <Grid container spacing={2.7} style={{
                display: "flex",
                alignItems: "center",
                marginBottom: '15px'
            }}>
                <Grid item sm={10}>
                    <h5 style={TitleStyle}>{title || ''}</h5>
                </Grid>
                <Grid item sm={2}>
                    <Link to={linkPath} style={{
                        display: hideLink ? 'none' : 'block',
                        textDecoration: 'none', color: '#000' }}>
                        <Button
                            variant="contained"
                            color="brandWarning"
                            sx={{ fontSize: '14px', height: '34px',
                                display: btnTop === false ? 'none' : btnTop === true ? 'block' : 'none'
                            }}>
                            {linkText}
                        </Button>
                    </Link>
                </Grid>
            </Grid>


            {children}
            <Link to={linkPath} style={{
                display: hideLink ? 'none' : 'block',
                textDecoration: 'none', color: '#000' }}>
                <Button
                    variant="contained"
                    color="brandWarning"
                    sx={{ fontSize: '14px', marginTop: '10px', width: '100%',
                        display: btnTop === true ? 'none' : btnTop === false ? 'block' : 'block'
                    }}>
                    {linkText}
                </Button>
            </Link>
        </DBox>
    );
};

const TitleStyle = {
    color: '#0877BD',
    fontWeight: '500',
    fontSize: '16px',
    textAlign: 'right',
    clear: 'both'
};

export default TitleBox;
