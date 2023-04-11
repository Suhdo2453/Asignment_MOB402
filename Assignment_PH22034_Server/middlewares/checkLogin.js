exports.LoginRequired = (req, res, next) => {
    req.session.userLogin ? next() : res.redirect('/login');
}

exports.SortMiddleware = (req, res, next) => {

    res.locals.currentPage = parseInt(req.query.page) || 1;
    res.locals.order = req.query.order;
    res.locals.sort = req.query.sort || null;

    next();
}

exports.validateUserFields = (req, res, next) => {
    const { username, email, passwd } = req.body;
    let error = '';
  
    // Kiểm tra tên đăng nhập không được để trống
    if (!username) {
      error = 'Username cannot be empty';
    }
  
    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = 'Invalid email address';
    }
  
    if (error) {
      res.status(400).json({ message: error });
    } else {
      next();
    }
  };