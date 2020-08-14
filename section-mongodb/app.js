const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require('express-handlebars');

const app = express();

//app.engine('hbs',expressHbs({layoutsDir:'views/layout/', defaultLayout:'main-layout',extname:'hbs'}));
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/404");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f3649f1b396093c8d944c63")
    .then((user) => {
      console.log("5f3649f1b396093c8d944c63");
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {
  app.listen(3000);
});
