const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crpyto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Sign Up',
            errorMessage: errors.array()[0].msg,
        });
    }

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

exports.getReset = (req, res, next) => {
    let errorMessage = req.flash("error");
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0];
    }
    else {
        errorMessage = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: errorMessage
    });
};

exports.postReset = (req, res, next) => {
    crpyto.randomBytes(32, (err, butter) => {
        if (err) {
            console.log(err);
            res.redirect('/reset');
        }
        const token = butter.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash("error", "Email is not found, please enter again");
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 36000000;
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
                return transporter.sendMail({
                    to: req.body.email,
                    from: 'sschleung@gmail.com',
                    subject: 'Password Reset',
                    html: `<p>You have request password reset</p>
                    <p>plz click the <a href="http://localhost:3000/reset/${token}">here</a> to reset the password within an hour</p>`
                });
            })
            .catch(err => console.log(err));
    })
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
            if (user) {
                let errorMessage = req.flash("error");
                if (errorMessage.length > 0) {
                    errorMessage = errorMessage[0];
                }
                else {
                    errorMessage = null;
                }
                res.render('auth/new-password', {
                    path: '/new-password',
                    pageTitle: 'New Password',
                    errorMessage: errorMessage,
                    userId: user._id.toString(),
                    passwordToken: token
                });
            }

        })
        .catch(err => { console.log(err) });

};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => { console.log(err) });
};