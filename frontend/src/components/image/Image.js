import React, { useEffect } from 'react';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';

function Image({
  url,
  alt = '',
  className = '',
  isBackground = false,
  setSignedUrl,
}) {
  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url,
    },
    { skip: !url }
  );

  useEffect(() => {
    if (imageS3?.signedUrl && setSignedUrl) {
      setSignedUrl(imageS3?.signedUrl);
    }
  }, [imageS3]);

  return isBackground ? (
    <div
      className={`image ${className}`}
      style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
    />
  ) : (
    <img src={imageS3?.signedUrl} alt={alt} className={className} />
  );
}

export default Image;
