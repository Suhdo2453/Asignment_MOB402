exports.getList = (req, res, next)=>{
    res.render('home/index', {title: 'Dashboard'});
}

exports.login=(req, res, next)=>{
    res.render('home/login');
}

exports.register=(req, res, next)=>{
    res.render('home/register');
}