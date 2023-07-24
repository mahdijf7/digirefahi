import { useContext } from 'react';
import { Box, Typography } from '@mui/material';

// Utils
import ChartContext from '../chart-context';

const OrgChartEmployeesHeader = ({}) => {
    const { selectedNode } = useContext(ChartContext);

    console.log(selectedNode);
    return (
        <Box sx={{  borderBottom: '1px solid #EEEEEE', padding: '16px 32px' }}>
            <Typography sx={{ fontWeight: 600 }}>
                لیست کارمندان در واحد سازمانی{' '}
                <Typography sx={{ color: '#0877BD', fontWeight: 600 }} component="span">
                    {selectedNode.name}
                </Typography>
            </Typography>
        </Box>
    );
};

export default OrgChartEmployeesHeader;
