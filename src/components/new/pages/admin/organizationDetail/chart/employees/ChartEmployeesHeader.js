import { useContext } from 'react';
import { Box, Typography } from '@mui/material';

// Utils
import ChartContext from '../chart-context';

const ChartEmployeesHeader = ({}) => {
    const { selectedNode } = useContext(ChartContext);

    console.log(selectedNode);
    return (
        <Box sx={{ mt: '36px',mb: '30px', borderBottom: '1px solid #EEEEEE', borderTop: '1px solid rgba(0, 0, 0, 0.2)', padding: '17px 32px' }}>
            <Typography sx={{ fontWeight: 600 }}>
                لیست کارمندان در واحد سازمانی <Typography sx={{ color: '#0877BD', fontWeight: 600 }} component="span">{selectedNode.name}</Typography>
            </Typography>
        </Box>
    );
};

export default ChartEmployeesHeader;
