import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';

export default function BasicBreadcrumbs({ data, fontSize, ...otherProps }) {
    const isLastLink = (index) => index === data.length - 1;

    return (
        <Box
            className="flex"
            justifyContent="flex-start"
            height="6rem"
            role="presentation"
            {...otherProps}
            sx={{
                '& a': {
                    fontSize: fontSize ? fontSize : '1.4rem',
                    pointerEvents: fontSize ? 'none' : 'auto', // Disable links if fontSize is provided
                },
            }}>
            {data.map((item, index) => (
                <Breadcrumbs key={index} aria-label="breadcrumb">
                    {isLastLink(index) ? (
                        <Typography
                            m="0 1rem"
                            variant="body1"
                            fontSize={fontSize ? fontSize : '1.4rem'}
                            color="primary"
                            fontWeight="bold"
                            component="span">
                            {item.title}
                        </Typography>
                    ) : (
                        <Link
                            mr="1rem"
                            underline="hover"
                            color={isLastLink(index) ? 'initial' : 'primary.main'} // Disable color for last link
                            sx={{
                                fontWeight: isLastLink(index) ? '700' : '300',
                                pointerEvents: isLastLink(index) ? 'none' : 'auto', // Disable last link
                            }}
                            href={item.link}>
                            {item.title}
                            {item.dash && <Typography component="span"> {item.dash}</Typography>}
                        </Link>
                    )}
                </Breadcrumbs>
            ))}
        </Box>
    );
}
