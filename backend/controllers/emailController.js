import express from 'express';
import { Resend } from 'resend';
import asyncHandler from '../middleware/asyncHandler.js';

const app = express();

// const data = await resend.emails.send({
//   from: 'Body Maraton <noreply@bodymaraton.com>',
//   to: req.body.email,
//   subject: 'Registrado en la Maraton',
//   html: `
//     <body style="text-align: center; background-color: #201d2b; color: #ffffff; padding: 20px; font-family: 'Arial', sans-serif;">
//       <h1 style="color: #ef0482;">Body Maraton</h1>
//       <h2>¡Has pagado con éxito!</h2>
//       <p>¡Prepárate para la próxima maratón que comienza el 3 de enero!</p>
//       <p><strong><a href="{https://bodymaraton.com/login}" style="color: #ef0482;">¡Únete a Body Maratón y cambia tu vida!</a></strong></p>
//     </body>
// `,
// });

// Email para probar en local
// from: 'Body Maraton <onboarding@resend.dev>',
export const sendEmail = asyncHandler(async (req, res, emailInfo) => {
  const resend = new Resend(process.env.RESEND_KEY);

  try {
    const emailContent = emailInfo || req.body;
    const data = await resend.emails.send(emailContent);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default sendEmail;
