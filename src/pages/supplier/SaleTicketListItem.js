import {Box} from '@mui/material';
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ViewIcon from "../../assets/icone/svg/ViewIcon";
const SearchOrderItems = ({item,background,border,showState,showOrderDetail}) => {
    return (

                        <Box
                            sx={{
                                backgroundColor:background,
                                border:`0.5px dashed ${border}`,
                                ...boxStyle
                            }}>
                            <span style={{borderLeft:`0.5px solid ${border}`,paddingLeft:25}}>{item.service.name}</span>
                            <span style={{borderLeft:`0.5px solid ${border}`,paddingLeft:25}}>{item.employee.full_name}</span>
                            <span style={{borderLeft:`0.5px solid ${border}`,paddingLeft:25}}>{`${item.price} تومان`}</span>
                            <span style={showState ? {borderLeft:`0.5px solid ${border}`,paddingLeft:25} : {}}>{`${new Date(item.created_at).toLocaleTimeString('fa-IR')} - ${new Date(item.created_at).toLocaleDateString('fa-IR')}`} </span>
                            {showState &&
                            <LoadingButton
                                variant="contained"
                                sx={blueLightBtnStyle}
                                color="error"
                                onClick={()=> {
                               
                                    showOrderDetail(item)
                                }}
                                >
                                    مشاهده     <ViewIcon sx={{marginLeft: '7px'}} />
                            </LoadingButton>}
                        </Box>


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
const blueLightBtnStyle = {
    padding: "4px 10px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "5px",
    fontSize: 12,
    color: "rgba(8, 119, 189, 1)",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: "transparent",
        border: "none",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: "transparent",
        border: "none",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none",
    },
}


export default SearchOrderItems;
