module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    Burger.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Burger.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return Burger;
  };