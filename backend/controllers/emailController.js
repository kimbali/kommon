import express from 'express';
import { Resend } from 'resend';
import asyncHandler from '../middleware/asyncHandler.js';

const app = express();
const resend = new Resend('re_9mFN6G36_27G8BxdE8EPnxW3XPervVxsS');

export const sendEmail = asyncHandler(async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: 'Body Maraton - ¡Registrado! <onboarding@resend.dev>',
      to: ['kimgarcianton@gmail.com'],
      subject: '¿El deporte de hace feliz?',
      html: `
        <div style="text-align: center; background-color: #201d2b; padding: 20px;">
          <h1 style="color: #ef0482; font-family: 'Arial', sans-serif;">Body Maratón</h1>
          <h2 style="font-family: 'Arial', sans-serif;">¡Has pagado con éxito!</h2>
          <p style="font-family: 'Arial', sans-serif;">¡Prepárate para la próxima maratón que comienza el 3 de enero!</p>
          <p style="font-family: 'Arial', sans-serif;"><strong><a href="http://bodymaraton.com" style="color: #ef0482;">¡Únete a Body Maratón y cambia tu vida!</a></strong></p>
        </div>
      `,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default sendEmail;
