// models/Loan.js Emprunt
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Loan.associate = (models) => {
    Loan.belongsTo(models.User);
    Loan.belongsTo(models.Book);
  };

  return Loan;
};
