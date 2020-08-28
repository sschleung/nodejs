module.exports = (req, res, next) => {
    console.log("Authenticated middleware(req): ", req.user);
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};