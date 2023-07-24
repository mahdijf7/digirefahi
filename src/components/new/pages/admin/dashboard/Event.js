import {Grid, Typography} from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from "react";
import {Paper} from "@mui/material";
let moment = require('moment-jalaali');
moment.loadPersian();

const Event = (props) => {
    const { name, date } = props.data;

    const inputDate = new Date(date);
    const today = new Date();

    const timeDifference = inputDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    let remaining;

    if (daysRemaining <= 0) {
        remaining = 'رویداد گذشته';
    } else if (daysRemaining < 7) {
        remaining = `${daysRemaining} روز ‌مانده`;
    } else if (daysRemaining < 30) {
        const weeksRemaining = Math.floor(daysRemaining / 7);
        remaining = `${weeksRemaining} هفته ‌مانده`;
    } else {
        const monthRemaining = Math.floor(daysRemaining / 30);
        remaining = `${monthRemaining} ماه ‌مانده`;
    }

    return (
        <Paper elevation={0} style={EventStyle}>
            <Grid container spacing={1} style={{direction: 'rtl'}}>
                <Grid item xs={3}>
                    <Grid container spacing={0} style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: "#0877BD",
                        minHeight: "58px",
                        borderRadius: '5px',
                        color: '#fff',
                        padding: '10px 0'
                    }}>
                        <Grid item xs={12}>
                            <Typography style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: '14px',
                                lineHeight: '1'
                            }}>{moment(date).format('jD')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: '11px',
                                lineHeight: '1'
                            }}>{moment(date).format('jMMMM')}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0} style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: "#F2F2F7",
                        minHeight: "58px",
                        borderRadius: '5px',
                        padding: '16px'
                    }}>
                        <Grid item xs={8}>
                            <Typography style={{
                                textAlign: 'right',
                                fontWeight: '500',
                                fontSize: '14px',
                            }}>{name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper variant={"outlined"} elevation={0} style={{
                                borderRadius: "3px",
                                border: "0.6px solid #0877BD",
                                background: '#EDFBFF'
                            }}>
                                <Typography style={{
                                    textAlign: 'center',
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    color: '#0877BD'
                                }}>{remaining}</Typography>
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};


const EventStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '5px 0',
    padding: '0',
    background: '#fff',
    borderRadius: '5px'

};
export default Event;
