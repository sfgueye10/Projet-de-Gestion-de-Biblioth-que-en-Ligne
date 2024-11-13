// models/User.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'roleID',
      }
    },
  }, {
    timestamps: false,
  });

  return User;
};
