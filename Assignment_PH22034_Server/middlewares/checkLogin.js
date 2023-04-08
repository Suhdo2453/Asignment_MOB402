exports.LoginRequired = (req, res, next) => {
    req.session.userLogin ? next() : res.redirect('/login');
}

exports.SortMiddleware = (req, res, next) => {

    res.locals.currentPage = parseInt(req.query.page) || 1;
    res.locals.order = req.query.order;
    res.locals.sort = req.query.sort || null;

    // if(req.query.hasOwnProperty('sort')){
    //     Object.assign(res.locals.sort, {
    //         enabled: true,
    //         type: req.query.type,
    //         column: req.query.column
    //     });
    // }

    next();
}