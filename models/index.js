import Sequelize from 'sequelize';
import connexion from '../connexion.js';
import roleModel from './Role.js';
import authorModel from './Author.js';
import genreModel from './Genre.js';
import userModel from './User.js';
import bookModel from './Book.js';
import commentModel from './Comment.js';
import loanModel from './Loan.js';
import reservationModel from './Reservation.js';

const sequelize = connexion;

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = roleModel(sequelize, Sequelize.DataTypes); 
db.Author = authorModel(sequelize, Sequelize.DataTypes);
db.Genre = genreModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Book = bookModel(sequelize, Sequelize.DataTypes);
db.Comment = commentModel(sequelize, Sequelize.DataTypes);
db.Loan = loanModel(sequelize, Sequelize.DataTypes);
db.Reservation = reservationModel(sequelize, Sequelize.DataTypes);

// Définir les associations
db.Role.hasMany(db.User, { foreignKey: 'roleID', as: 'users' });
db.User.belongsTo(db.Role, { foreignKey: 'roleID', as: 'role' });

db.Genre.hasMany(db.Book, { foreignKey: 'genreID', as: 'books' });
db.Book.belongsTo(db.Genre, { foreignKey: 'genreID', as: 'genre' });

db.Author.hasMany(db.Book, { foreignKey: 'authorID', as: 'books' });
db.Book.belongsTo(db.Author, { foreignKey: 'authorID', as: 'author' });

db.Book.hasMany(db.Comment, { foreignKey: 'bookID', as: 'comments' });
db.Comment.belongsTo(db.Book, { foreignKey: 'bookID', as: 'book' });

db.User.hasMany(db.Comment, { foreignKey: 'userID', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'userID', as: 'user' });

db.Book.hasMany(db.Loan, { foreignKey: 'bookID', as: 'loans' });
db.Loan.belongsTo(db.Book, { foreignKey: 'bookID', as: 'book' });

db.User.hasMany(db.Loan, { foreignKey: 'userID', as: 'loans' });
db.Loan.belongsTo(db.User, { foreignKey: 'userID', as: 'user' });

db.Book.hasMany(db.Reservation, { foreignKey: 'bookID', as: 'reservations' });
db.Reservation.belongsTo(db.Book, { foreignKey: 'bookID', as: 'book' });

db.User.hasMany(db.Reservation, { foreignKey: 'userID', as: 'reservations' });
db.Reservation.belongsTo(db.User, { foreignKey: 'userID', as: 'user' });

export default db;
