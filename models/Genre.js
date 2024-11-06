// models/Genre.js
module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    Genre.associate = (models) => {
      Genre.hasMany(models.Book, { foreignKey: 'genreId' });
    };
  
    return Genre;
  };
  