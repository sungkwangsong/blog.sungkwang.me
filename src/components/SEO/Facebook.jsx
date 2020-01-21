import React from 'react';
import Helmet from 'react-helmet';

export default ({
  url = null,
  type = null,
  title = null,
  description = null,
  image = null,
  appID = null,
}) => (
  <Helmet>
    {url && <meta property="og:url" content={url} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {appID && <meta property="fb:app_id" content={appID} />}
  </Helmet>
);