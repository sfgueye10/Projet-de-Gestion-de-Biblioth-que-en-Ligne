<<<<<<< HEAD
// models/Loan.js Emprunt
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
=======
// models/Loan.js
export default (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
>>>>>>> fallou
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
<<<<<<< HEAD
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Loan.associate = (models) => {
    Loan.belongsTo(models.User);
    Loan.belongsTo(models.Book);
  };

=======
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

>>>>>>> fallou
  return Loan;
};
