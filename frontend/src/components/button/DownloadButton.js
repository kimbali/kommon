import React from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DownloadButton = ({ signedUrl, imageName = 'BodyMarathon' }) => {
  if (!signedUrl) {
    return;
  }
  return (
    <a href={signedUrl} download>
      <FontAwesomeIcon icon={faDownload} />
    </a>
  );
};

export default DownloadButton;
