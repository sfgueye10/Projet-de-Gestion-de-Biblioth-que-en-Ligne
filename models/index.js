<<<<<<< HEAD
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
=======
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
>>>>>>> fallou
