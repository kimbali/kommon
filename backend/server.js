import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import recipesRoutes from './routes/recipesRoutes.js';
import ingredientsRoutes from './routes/ingredientsRoutes.js';
import measuresRoutes from './routes/measuresRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import workoutsRoutes from './routes/workoutsRoutes.js';
import meditationsRoutes from './routes/meditationsRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import marathonesRoutes from './routes/marathonRoutes.js';
import planningsRoutes from './routes/planningsRoutes.js';
import daysRoutes from './routes/daysRoutes.js';
import legalsRoutes from './routes/legalsRoutes.js';
import uploadS3 from './routes/imagesRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import regionsRoutes from './routes/regionsRoutes.js';
import sendEmailRoutes from './routes/sendEmailRoutes.js';
import dietsRoutes from './routes/dietsRoutes.js';
import configRoutes from './routes/configRoutes.js';
import giftsRoutes from './routes/giftsRoutes.js';
import faqsRoutes from './routes/faqsRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/recipes', recipesRoutes);
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/measures', measuresRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/meditations', meditationsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/marathons', marathonesRoutes);
app.use('/api/plannings', planningsRoutes);
app.use('/api/days', daysRoutes);
app.use('/api/legals', legalsRoutes);
app.use('/api/upload', uploadS3);
app.use('/api/progress', progressRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/email', sendEmailRoutes);
app.use('/api/diets', dietsRoutes);
app.use('/api/config', configRoutes);
app.use('/api/gifts', giftsRoutes);
app.use('/api/faqs', faqsRoutes);

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
