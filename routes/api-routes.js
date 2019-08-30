// Requiring our models
var db = require("../models");

//Routes
// =============================================================
module.exports = app => {
  //On page load or on redirects
  app.get("/", (req, res) => {
    res.redirect("/burgers");
  });

  //On page load or on redirects
  app.get("/burgers", (req, res) => {
    var query = {};
    if (req.query.CustomerId) {
      query.Customer = req.query.CustomerId;
    }

    //If the CustomerId field of the burgers table is not empty, include the customer of that id in the results
    db.Burger
      .findAll({
        include: db.Customer,
        where: query
      })
      .then(data => {
        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
      });
  });

  //When submit button is pressed
  app.post("/burgers/create", (req, res) => {
    db.Burger
      .create({
        burger_name: req.body.burger_name
      })
      .then(() => {
        res.redirect("/burgers");
      });
  });

  //When devour button is pressed
  app.put("/burgers/update", (req, res) => {
    var customerName = req.body.eaten_by;

    db.Customer
      .findAll({
        where: { customer_name: customerName }
      })
      .then(data => {
        if (data.length > 0) {
          //If customer already exists in database, devour burger
          console.log("customer already exists");
          devour(data[0].dataValues.id);
        } else {
          //If customer does not exist in database, create new customer, then devour burger
          console.log("creating new customer");
          db.Customer
            .create({
              customer_name: req.body.eaten_by
            })
            .then(data => devour(data.dataValues.id));
        }
      });

    //Mark burger as devoured and record the id of the customer who ate it  
    function devour(customer) {
      console.log("devouring");
      
      db.Burger
        .update(
          {
            devoured: true,
            CustomerId: customer
          },
          {
            where: { id: req.body.burger_id }
          }
        )
        .then(() => {
          res.redirect("/burgers");
        });
    }
  });
};