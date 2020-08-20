const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const expressHbs = require('express-handlebars');

const app = express();

//app.engine('hbs',expressHbs({layoutsDir:'views/layout/', defaultLayout:'main-layout',extname:'hbs'}));
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/404");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f3e1d93bd99af05b8315620")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose
  .connect(
    "mongodb+srv://harry-nodejs:159357456@cluster0.czdnl.gcp.mongodb.net/shop-with-mongoose?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connent succsee!");

    User.findOne()
      .then((dbUser) => {
        if (!dbUser) {
          const user = new User({
            name: "harry",
            email: "testing@abc.com",
            cart: { items: [] },
          });
          user.save();
        }
      })
      .then((result) => {
        app.listen(3000);
      });
  })
  .catch((err) => console.log(err));
