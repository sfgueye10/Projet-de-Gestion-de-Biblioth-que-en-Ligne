// models/Author.js
export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    authorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

  return Author;
};
