// models/Comment.js
<<<<<<< HEAD
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
  
=======
export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      commentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
      },
      bookID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Books',
          key: 'bookID',
        }
      },
      userID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userID',
        }
      },
    }, {
      timestamps: false,
    });
  
>>>>>>> fallou
    return Comment;
  };
  