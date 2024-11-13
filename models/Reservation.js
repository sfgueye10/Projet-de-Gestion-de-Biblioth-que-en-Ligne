// models/Reservation.js
<<<<<<< HEAD
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
  
=======
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

>>>>>>> fallou
