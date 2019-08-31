// Requiring our models
var db = require("../models");

// Routes
module.exports = app => {
  // on page load or on redirects
  app.get("/", (req, res) => {
    res.redirect("/burgers");
  });

  // on page load or on redirects
  app.get("/burgers", (req, res) => {
    var query = {};
    if (req.query.CustomerId) {
      query.Customer = req.query.CustomerId;
    }
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

  app.post("/burgers/create", (req, res) => {
    db.Burger
      .create({
        burger_name: req.body.burger_name
      })
      .then(() => {
        res.redirect("/burgers");
      });
  });

  app.put("/burgers/update", (req, res) => {
    var customerName = req.body.eaten_by;
    db.Customer
      .findAll({
        where: { customer_name: customerName }
      })
      .then(data => {
        if (data.length > 0) {
          console.log("customer already exists");
          devour(data[0].dataValues.id);
        } else {
          console.log("creating new customer");
          db.Customer
            .create({
              customer_name: req.body.eaten_by
            })
            .then(data => devour(data.dataValues.id));
          }
      });

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

