
// models/Book.js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author);
    Book.hasMany(models.Loan);
  };

  return Book;
};
