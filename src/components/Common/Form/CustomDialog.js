import { HighlightOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

const CustomDialog = ({
  showDialog,
  setShowDialog,
  text,
  warningText,
  handleSubmitDialog,
}) => {
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <Dialog open={showDialog} onClose={handleCloseDialog}>
      <DialogContent>
        <div>
          <HighlightOff />
        </div>
        <Typography align="center" variant="h6" component="p">
          {text}
        </Typography>
        <p align="center">{warningText}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          خیر
        </Button>
        <Button onClick={handleSubmitDialog} color="primary">
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
