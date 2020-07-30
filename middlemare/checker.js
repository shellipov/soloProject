function sessionChecker(req, res, next) {
  if (req.session.user) {
    res.redirect('/main');
  } else {
    next();
  }
}

export default sessionChecker;
