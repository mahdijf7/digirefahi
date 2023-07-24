import {Grid, Typography} from '@mui/material';
// Assets
import theme from 'assets/theme';
import { Link } from 'react-router-dom';
import React from "react";
import {Paper} from "@mui/material";
let moment = require('moment-jalaali');

const StarIconSvg = require('../../../../../assets/icone/star.svg').default;
const CommentIconSvg = require('../../../../../assets/icone/comment.svg').default;

const Comment = (props) => {
    const { service_name, company_name, comment, name, supplier_name, created_at, score } = props.data;

    return (
        <Paper elevation={0} style={CommentStyle}>
            <Grid container spacing={0} style={{direction: 'rtl'}}>
                <Grid item xs={10}>
                    <Typography style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: '500',
                        textAlign: 'right'}}>
                        <img src={CommentIconSvg} alt="icon"/>
                        <span style={{color: '#0877BD', fontSize: '12px'}}>{service_name}</span>
                        <span style={{margin: '0 3px'}}>/</span>
                        <span style={{fontSize: '10px'}}>{company_name}</span>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{
                        textAlign: 'left',
                        fontSize: '10px',
                        fontWeight: '500',
                        opacity: '60%'}}>{score} <img src={StarIconSvg} alt="icon"/></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{
                        textAlign: 'right',
                        fontSize: '11px',
                        fontWeight: '500'}}>{comment}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{
                        textAlign: 'right',
                        fontSize: '10px',
                        fontWeight: '400',
                        opacity: '60%'}}>{supplier_name} - {name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{
                        textAlign: 'left',
                        fontSize: '8px',
                        fontWeight: '400',
                        opacity: '60%'}}>{moment(created_at).format('hh:mm - jYYYY/jM/jD')}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};


const CommentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: '5px 0',
    padding: '15px',
    background: '#F2F2F7',
    borderRadius: '5px'
};
export default Comment;
