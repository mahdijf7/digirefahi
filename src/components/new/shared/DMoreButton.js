import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DMoreButton = ({ tag = 'button', to, onClick }) => {
    const linkProps =
        tag === 'a'
            ? {
                  component: Link,
                  to: to,
              }
            : {};
    const clickHandler = () => {
        if (tag === 'button') onClick();
    };
    return (
        <Button variant="outlined" sx={{ p: 0, minWidth: '22px' }} onClick={clickHandler} {...linkProps}>
            <MoreVertIcon fontSize="large" />
        </Button>
    );
};

export default DMoreButton;
