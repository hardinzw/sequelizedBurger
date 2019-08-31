"use strict"
module.exports = (sequelize, DataTypes) => {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        }
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.Burger, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Customer;
};