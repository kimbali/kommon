import { loadImage } from '../../utils/fetchImage';

async function template() {
  const girlFoto = '1708855366397_image_main-img.png';
  const logoTransparent = '1708855335399_image_logo-transparent.png';

  const fetchedImageUrlLogo = await loadImage(logoTransparent);
  const fetchedImageUrlGirl = await loadImage(girlFoto);

  return `<body style="min-height: 100vh; display: flex; padding: 24px 12px 52px; justify-content: center; flex-direction: column; align-items: center; background: rgb(239,4,130); background: linear-gradient(0deg, rgba(239,4,130,1) 0%, rgba(35,39,55,1) 70%); color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
    <img src="${fetchedImageUrlLogo}" alt="Bodymaraton logo" style="height: 122px;">

    <h1 style="font-size: 36px; margin-bottom: 12px; color: #ef0482">¡Felicidades!</h1>

    <p style="text-align: center; margin-top: 0; font-size: 24px; font-weight: bold; color: #ef0482">Te has registrado con éxito</p>

    <p style="text-align: center; font-size: 18px; margin-bottom: 14px;">Sigue el enlace de abajo</p>
    <p style="text-align: center; font-size: 18px; margin-top: 0;">La Maratón comenzará el dia indicado en tu área personal</p>

    <a href="https://bodymaraton.com/login" target="_blank" style="text-decoration: none; border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; background-color: #ef0482; color: white; padding: 12px 24px; font-size: 20px; margin-top: 32px; font-weight: bold; margin-bottom: 52px;">Accede a tu área personal</a>

    <img src="${fetchedImageUrlGirl}" alt="Bodymaraton girl" style="height: 480px; border-radius: 100%;"/>
  </body>`;
}

export default template;
