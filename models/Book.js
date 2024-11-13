// models/Book.js
<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
=======
export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
>>>>>>> fallou
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    isbn: {
=======
    publicationDate: {
      type: DataTypes.DATE,
    },
    ISBN: {
>>>>>>> fallou
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
<<<<<<< HEAD
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author);
    Book.hasMany(models.Loan);
  };

=======
    summary: {
      type: DataTypes.TEXT,
    },
    genreID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Genres',
        key: 'genreID',
      }
    },
    authorID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Authors',
        key: 'authorID',
      }
    },
  }, {
    timestamps: false,
  });

>>>>>>> fallou
  return Book;
};
