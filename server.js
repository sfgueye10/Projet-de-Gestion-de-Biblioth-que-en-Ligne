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
});
