//Importation 
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



// Synchronisation des modèles avec la base de données
db.sequelize.sync({ force: false }).then(() => {
  console.log('Tables synchronisées.');
  app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
  });
}).catch(err => {
  console.error('Erreur lors de la synchronisation des tables :', err);
});
