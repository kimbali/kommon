import React from 'react';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';

function Image({ url, alt = '', className, isBackground = false }) {
  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url,
    },
    { skip: !url }
  );

  return isBackground ? (
    <div
      className={className}
      style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
    />
  ) : (
    <img src={imageS3?.signedUrl} alt={alt} className={className} />
  );
}

export default Image;
