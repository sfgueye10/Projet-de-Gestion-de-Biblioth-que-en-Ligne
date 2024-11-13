// models/Role.js
<<<<<<< HEAD
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
  
=======
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
>>>>>>> fallou
