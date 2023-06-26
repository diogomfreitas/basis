module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    code: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });

  return Category;
};
