const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));


exports.getLogin = (req, res, next) => {
    let errorMessage = req.flash("error");
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0];
    }
    else {
        errorMessage = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash("error", "invalid login mail or password");
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        })
                    }
                    req.flash("error", "invalid login mail or password");
                    res.redirect('/login');
                })
        })
        .catch(err => console.log(err));



};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};

exports.getSignUp = (req, res, next) => {
    let errorMessage = req.flash("error");
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0];
    }
    else {
        errorMessage = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign Up',
        errorMessage: errorMessage,
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash("error", "Email is used, Try another one.");
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        to: email,
                        from: 'sschleung@gmail.com',
                        subject: 'Sign Up',
                        html: '<h1>Congrat! you have signed up1</h1>'
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};