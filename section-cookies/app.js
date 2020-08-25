const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = "mongodb+srv://harry-nodejs:159357456@cluster0.czdnl.gcp.mongodb.net/shop-with-mongoose";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'session'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'what the fuck is going on?', resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  console.log(req.session.user);
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
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
