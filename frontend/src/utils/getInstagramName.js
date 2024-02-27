// Example: https://www.instagram.com/bodymaraton/
function extraerUsername(url) {
  if (!url) {
    return 'instagram';
  }

  let instaName = url.split('instagram.com/')[1]?.replace('/', '');

  return `@${instaName}`;
}

export default extraerUsername;
