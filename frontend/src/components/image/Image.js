import React from 'react';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';

function Image({ url, alt = '' }) {
  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url,
    },
    { skip: !url }
  );

  return <img src={imageS3?.signedUrl} alt={alt} />;
}

export default Image;
