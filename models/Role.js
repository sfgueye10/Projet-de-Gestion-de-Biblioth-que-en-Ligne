// models/Role.js
export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleID: {
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
  });

  return Role;
};
