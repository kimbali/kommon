import { loadImage } from '../../utils/fetchImage';

async function templateRegister() {
  const girlFoto = '1708855366397_image_main-img.png';
  const logoTransparent = '1708855335399_image_logo-transparent.png';

  const fetchedImageUrlLogo = await loadImage(logoTransparent);
  const fetchedImageUrlGirl = await loadImage(girlFoto);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Body maraton</title>
    </head>
    <body
      style="padding: 24px 12px; background: rgb(239,4,130); background: linear-gradient(0deg, rgba(239,4,130,1) 0%, rgba(35,39,55,1) 40%); color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
      <table style="border: none; width: 600px; border-collapse: collapse; width: 100%; margin: 32px 0;">
        <tr>
          <th style="text-align: center">
            <img src="${fetchedImageUrlLogo}" alt="Bodymaraton logo"
              style="display: inline-block; height: 122px;">
          </th>
        </tr>
  
        <tr>
          <th style="text-align: center;">
            <h1 style="text-align: center; font-size: 36px; margin-bottom: 12px; color: #ef0482">¡Felicidades!</h1>
          </th>
        </tr>
  
        <tr>
          <th style="text-align: center;">
            <p style="text-align: center; margin-top: 0; font-size: 24px; font-weight: bold; color: #ef0482">Te has registrado con éxito</p>
          </th>
        </tr>
  
        <tr style="margin-bottom: 24px;">
          <th style="text-align: center;">
            <p style="text-align: center; font-size: 18px; margin-bottom: 14px; color: white;">Sigue el enlace de abajo para acceder a tu área personal</p>
          </th>
        </tr>
  
        <tr style="margin-bottom: 24px;">
          <th style="text-align: center;">
            <p style="text-align: center; font-size: 18px; margin-top: 0; color: white;">La Maratón comenzará el dia indicado</p>
          </th>
        </tr>
  
        <tr style="margin-bottom: 32px;">
          <th style="text-align: center;">
            <a href="https://bodymaraton.com/login" target="_blank" style="display: inline-block; margin: 32px auto; text-align: center; text-decoration: none; border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; background-color: #ef0482; color: white; padding: 12px 24px; font-size: 20px; margin-top: 32px; font-weight: bold; margin-bottom: 52px;">Accede a tu área personal</a>
          </th>
        </tr>
  
        <tr style="margin-bottom: 24px;">
          <th style="text-align: center;">
            <img src="${fetchedImageUrlGirl}" alt="Bodymaraton girl" style="display: inline-block; height: 380px; border-radius: 100%;" />
          </th>
        </tr>
      </table>
    </body>
  </html>`;
}

export default templateRegister;
