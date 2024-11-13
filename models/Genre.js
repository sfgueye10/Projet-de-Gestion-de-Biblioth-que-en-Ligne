// models/Genre.js
<<<<<<< HEAD
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
  
=======
export default (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genreID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

  return Genre;
};
>>>>>>> fallou
