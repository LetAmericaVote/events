function middlewareWrapper(req, res, next) {
  return (middleware) => {
    try {
      middleware(req, res, next);
    } catch (error) {
      console.error('Middleware Level Error\n', error);

      const errorResponse = {
        error: true,
        messagge: 'Internal server error.',
      };

      if (process.env.NODE_ENV === 'development') {
        errorResponse.log = error;
      }

      res.status(500).json(errorResponse);
    }
  }
}

module.exports = middlewareWrapper;
