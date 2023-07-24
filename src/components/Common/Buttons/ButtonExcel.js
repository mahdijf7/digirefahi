import React from "react";
import { Button, Typography } from "@mui/material";
import theme from "../../../assets/theme";
import Excel from "../../../assets/icone/svg/Excel";

function ButtonExcel({ sx, onClick, ...otherProps }) {
  const style = {
    mt: "1.9rem",
    py: "2.5rem",
    px: "0.5rem",
    borderRadius: ".5rem",
    fontSize: "1.7rem",
    width: "15.8rem",
    height: "3rem",
    color: theme.main.palette.primary.main,
    backgroundColor: theme.main.palette.common.white,
    border: "0.1rem solid",
    borderColor: theme.main.palette.primary.main,
    ...sx,
    "&:hover": {
      backgroundColor: theme.main.palette.common.white,
      color: theme.main.palette.primary.main,
    },
    "&:active": {
      transform: "scale(0.99)",
    },
  };

  return (
    <Button sx={style} onClick={onClick} {...otherProps}>
      <Excel />
      <Typography variant="h4" mr="0.5rem">
        خروجی اکسل
      </Typography>
    </Button>
  );
}

export default ButtonExcel;
