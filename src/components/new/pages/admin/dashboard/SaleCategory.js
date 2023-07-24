import {Grid, Typography} from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from "react";
import {Paper} from "@mui/material";

const Theme = {
    Blue: 'Blue',
    Gray: 'Gray'
}

const SaleCategory = (props) => {
    const { category } = props.data;
    const theme = props.theme || Theme.Blue;

    return (
        <Paper elevation={0} style={SaleCategoryStyle}>
            <Grid container spacing={1} style={{direction: 'rtl'}}>
                <Grid item xs={2}>
                    <Grid container spacing={0} style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme === Theme.Blue ? '#EDFBFF' : theme === Theme.Gray ? '#F2F2F7' : 'inherit',
                        minHeight: "34px",
                        borderRadius: '5px',
                        color: '#0877BD',
                    }}>
                        <Grid item xs={12}>
                            <Typography style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '1'
                            }}>{Number(props.index)+1}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={0} style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme === Theme.Blue ? '#EDFBFF' : theme === Theme.Gray ? '#F2F2F7' : 'inherit',
                        minHeight: "34px",
                        borderRadius: '5px',
                        padding: '0 24px 0 15px'
                    }}>
                        <Grid item xs={12}>
                            <Typography style={{
                                textAlign: 'right',
                                fontWeight: '500',
                                fontSize: '13px',
                            }}>{category.name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};


const SaleCategoryStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '5px 0',
    padding: '0',
    background: '#fff',
    borderRadius: '5px',
    marginLeft: "20px",
};
export default SaleCategory;
