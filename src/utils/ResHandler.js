module.exports = {
  success: (req, res, next) => {
    if (res.payload) {
      res.send(res.payload);
    } else {
      const err = new Error('Resource Not Found');
      err.status = 404;
      return next(err);
    }
    return next();
  },
  error: (err, req, res, next) => {
    res.status(err.status || 500);
    const response = {};
    response.status = 'error';
    response.code = err.status || 500;
    response.message = err.message || 'Internal server error';
    console.log(err);
    res.send({
      error: response,
    });
    next();
  },
};
