// models/Comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Book, { foreignKey: 'bookId' });
    };
  
    return Comment;
  };
  