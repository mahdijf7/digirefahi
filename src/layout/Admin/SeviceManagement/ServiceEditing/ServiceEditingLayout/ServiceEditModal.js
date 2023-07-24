import React from 'react';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import { Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ServiceEditModal({ open, handleClose, url, selectedItem }) {
    // console.log(url);
    return (
        <div>
            <DDialogWrapper strip size="sm" open={open} onClose={handleClose}>
                <Box onClick={handleClose} position="absolute" left="2rem" top="2rem" zIndex="100">
                    <HighlightOffIcon sx={{ fontSize: '3rem', color: 'white', cursor: 'pointer' }} />
                </Box>
                <Box position="relative" minHeight="15rem">
                    {(typeof selectedItem === 'string' && selectedItem?.includes('.mp4')) || selectedItem?.type === 'video' ? (
                        <video style={{ width: '100%', height: '100%', margin: '-1rem  0 ' }} className="img" controls>
                            <source src={selectedItem?.url || url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img style={{ width: '100%', height: '100%', margin: '-1rem  0 ' }} className="img" src={url} alt="" />
                    )}
                </Box>
            </DDialogWrapper>
        </div>
    );
}

export default ServiceEditModal;
