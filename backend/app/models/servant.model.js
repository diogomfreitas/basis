module.exports = (sequelize, DataTypes) => {
  const Servant = sequelize.define("servant", {
    name: {
      type: DataTypes.STRING,
    },
    registration: {
      type: DataTypes.INTEGER,
    },
    department: {
      type: DataTypes.STRING,
    },
  });

  return Servant;
};
