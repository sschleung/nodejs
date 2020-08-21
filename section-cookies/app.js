const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f3e1d93bd99af05b8315620')
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
