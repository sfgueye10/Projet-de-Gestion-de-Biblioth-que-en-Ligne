// models/Role.js
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Role.associate = (models) => {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    };
  
    return Role;
  };
  