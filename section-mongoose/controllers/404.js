exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: '404 Not Found ar',
        path: '/404'
    });
}
