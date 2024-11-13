// models/Comment.js
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
  
    return Comment;
  };
  