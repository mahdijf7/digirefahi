import { Typography, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

// Assets
import theme from 'assets/theme';

const Breadcrumb = ({ links }) => {
    const linksAreCorrect = Array.isArray(links) && links.length > 0;
    return (
        linksAreCorrect && (
            <Breadcrumbs aria-label="breadcrumb">
                {links.map((link, index) => {
                    const isLastLink = index === links.length - 1;
                    return isLastLink ? (
                        <Typography fontSize="14px" color="primary.main" fontWeight="700" key={link.title}>
                            {link.title}
                        </Typography>
                    ) : (
                        <Link style={breadcrumbLinkStyles} to={link.path} key={link.title}>
                            {link.title}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        )
    );
};

const breadcrumbLinkStyles = {
    color: theme.main.palette.primary.main,
    textDecoration: 'none',
    fontSize:"14px",
    '&:hover': {
        fontWeight: 700,
    },
};

export default Breadcrumb;
