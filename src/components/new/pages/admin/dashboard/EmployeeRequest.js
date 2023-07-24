import {Divider, Grid, Typography} from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from "react";
import {Paper} from "@mui/material";
let moment = require('moment-jalaali');

const Theme = {
    Blue: 'Blue',
    Gray: 'Gray'
}

const EmployeeRequest = (props) => {
    const { company_name, employee, service, price, created_at } = props.data;
    const theme = props.theme || Theme.Blue;

    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Paper variant={"outlined"} elevation={0} style={{...EmployeeRequestStyle,
            backgroundColor: theme === Theme.Blue ? '#EDFBFF' : theme === Theme.Gray ? '#F2F2F7' : 'inherit',
            borderColor: theme === Theme.Blue ? '#0877BD' : theme === Theme.Gray ? '#B4B4B4' : 'inherit',
        }}>
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
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{service.name}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{company_name}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{employee.full_name}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{service.supplier}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{addCommas(price)} تومان</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography flex={3} style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '1'
                    }}>{moment(created_at).format('hh:mm - jYYYY/jM/jD')}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};


const EmployeeRequestStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '7px 0',
    padding: '0',
    background: '#fff',
    border: '0.5px dashed #0877BD',
    borderRadius: '5px',

};
export default EmployeeRequest;
