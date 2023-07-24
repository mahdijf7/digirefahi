import React from 'react';
import { Helmet } from 'react-helmet';

function MetaData({ meta }) {
  return (
    <Helmet>
      <title>{meta.title || ''}</title>
      <meta name="description" content={meta.content || ''} />
    </Helmet>
  );
}

export default MetaData;
