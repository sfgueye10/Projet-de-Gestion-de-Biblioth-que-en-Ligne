// models/Reservation.js
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
      reservationDate: {
        type: DataTypes.DATE,
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
  
    Reservation.associate = (models) => {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
      Reservation.belongsTo(models.Book, { foreignKey: 'bookId' });
    };
  
    return Reservation;
  };
  