// models/Loan.js
export default (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    returnDate: {
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

  return Loan;
};
