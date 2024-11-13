// models/Reservation.js
export default (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservationDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
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

  return Reservation;
};

