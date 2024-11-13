// models/Book.js
export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
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

  return Book;
};
