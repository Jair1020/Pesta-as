const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      name_product: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          let name = value.toLowerCase();
          this.setDataValue("name_product", name);
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
