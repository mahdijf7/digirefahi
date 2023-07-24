import {Divider, Grid, Typography} from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from "react";
import {Paper} from "@mui/material";
let moment = require('moment-jalaali');

const CreditRequest = (props) => {
    const { company, price, created_at } = props.data;

    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Paper variant={"outlined"} elevation={0} style={ServiceRequestStyle}>
            <Grid container spacing={0} style={{direction: 'rtl'}}>
                <Grid item xs={12} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: "50px",
                    padding: '7px'
                }}>
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '12px',
                        lineHeight: '1'
                    }}>{company.name}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '12px',
                        lineHeight: '1'
                    }}>{addCommas(price)} تومان</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={2} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '12px',
                        lineHeight: '1'
                    }}>{moment(created_at).format('jYYYY/jM/jD')}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};


const ServiceRequestStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '5px 0',
    padding: '0',
    background: '#fff',
    border: '0.8px solid #B4B4B4',
    borderRadius: '5px',

};
export default CreditRequest;
