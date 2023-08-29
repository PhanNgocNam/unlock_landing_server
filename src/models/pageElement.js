"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    {
      part_id: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.INTEGER, allowNull: false },
      permision: { type: DataTypes.INTEGER, allowNull: false },
      special: { type: DataTypes.INTEGER, allowNull: false },

      createdAt: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: new Date().getTime(),
      },

    },
    {
      sequelize,
      modelName: "Page",
    }
  );
  return Page;
};
