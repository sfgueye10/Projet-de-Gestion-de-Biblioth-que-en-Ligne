// models/Author.js
<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
=======
export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    authorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
>>>>>>> fallou
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book);
  };

=======
    bio: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

>>>>>>> fallou
  return Author;
};
