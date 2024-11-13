// models/User.js
<<<<<<< HEAD
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
=======
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
>>>>>>> fallou
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
<<<<<<< HEAD
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.associate = (models) => {
    User.hasMany(models.Loan);
  };

  return User;
};
=======
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
>>>>>>> fallou
