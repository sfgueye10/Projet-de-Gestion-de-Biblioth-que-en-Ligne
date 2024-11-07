// models/Author.js
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book);
  };

  return Author;
};
