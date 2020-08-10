const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const app = express();

//app.engine('hbs',expressHbs({layoutsDir:'views/layout/', defaultLayout:'main-layout',extname:'hbs'}));
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/404');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);