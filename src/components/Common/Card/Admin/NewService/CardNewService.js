import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Card from '../../Card';

import { theme } from 'assets/theme/default';
const { palette } = theme;

function CardNewService({ children, title, ...otherProps }) {
  const { t } = useTranslation();
  return (
    <Card {...otherProps}>
      <Box height="5rem" position="relative" borderBottom={`.1rem solid ${palette.text.light} `}>
        <Typography
          position="absolute"
          bottom="-.1rem"
          right="2rem"
          borderBottom={`.2rem solid ${palette.primary.main} `}
          variant="h4"
          color="primary.main"
          p=".8rem 1.4rem"
        >
          {t(title)}
        </Typography>
      </Box>
      <Box p="2rem">{children}</Box>
    </Card>
  );
}

export default CardNewService;
