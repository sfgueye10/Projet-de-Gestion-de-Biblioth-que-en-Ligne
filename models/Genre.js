// models/Genre.js
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
