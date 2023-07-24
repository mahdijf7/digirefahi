import {Box, Grid, Typography} from '@mui/material';
import React, {useState} from "react";
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import TicketIcon from "../../assets/icone/svg/TicketIcon";
import SaleTicketListItem from "./SaleTicketListItem";
import SearchOrderDetail from "./SearchOrderDetail";
import theme from "../../assets/theme/default";
const SearchOrderItems = ({onClose,searchCode,searchOrders,openShowOrderDetail}) => {


    const showOrderDetail=(item)=>{
        openShowOrderDetail(item);
    }

    return (

        <DDialogWrapper open onClose={onClose} size="sg">

        <DDialogHeader title={` نتیجه جستجو ”${searchCode} “`}  onClose={onClose}/>
            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '30px'}}>

                <Grid container spacing={2} sx={{padding: '0px 10px 0 40px'}}>
                    {searchOrders || searchOrders.length === 0 &&
                    <Typography>دیتایی برای نمایش وجود ندارد.</Typography>}
                    {searchOrders && searchOrders.map((item, index) => (

                        <SaleTicketListItem item={item}
                                            background={index % 2 === 0 ? "rgba(237, 251, 255, 1)" : "rgba(242, 242, 247, 1)"}
                                            border={index % 2 === 0 ? "rgba(8, 119, 189, 1)" : "rgba(180, 180, 180, 1)"}
                        showState={true} showOrderDetail={showOrderDetail}/>
                    ))}

                </Grid>
            </Box>

        </DDialogWrapper>

    );
};


const boxStyle={
    p: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    gap: '8px',
    color:'#000',
    borderRadius:"5px",
    fontWeight: 400,
    fontSize:13,
    marginBottom:"10px",
    width:"100%"

}



export default SearchOrderItems;
