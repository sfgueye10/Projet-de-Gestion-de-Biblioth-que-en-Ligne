<<<<<<< HEAD
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const loanRoutes = require('./routes/loanRoutes');
const genreRoutes = require('./routes/genreRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, bookRoutes);
app.use('/api', authMiddleware, authorRoutes);
app.use('/api', authMiddleware, loanRoutes);
app.use('/api', authMiddleware, genreRoutes);
app.use('/api', authMiddleware, commentRoutes);
app.use('/api', authMiddleware, reservationRoutes);
app.use('/api', authMiddleware, roleRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
=======
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models/index.js';
import roleRoutes from './routes/roleRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import authRoutes from './routes/authRoutes.js'; 



// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', roleRoutes);
app.use('/api', authorRoutes);
app.use('/api', genreRoutes);
app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', commentRoutes);
app.use('/api', loanRoutes);
app.use('/api', reservationRoutes);
app.use('/api/auth', authRoutes);



// Synchroniser les modèles avec la base de données
db.sequelize.sync({ force: false }).then(() => {
  console.log('Tables synchronisées.');
  app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
  });
}).catch(err => {
  console.error('Erreur lors de la synchronisation des tables :', err);
>>>>>>> fallou
});
