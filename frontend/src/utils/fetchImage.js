const fetchImage = async url => {
  try {
    const response = await fetch(`${window.location.origin}/api/upload/${url}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export const loadImage = async url => {
  try {
    const imageUrl = await fetchImage(url);

    return imageUrl?.signedUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

export default fetchImage;
