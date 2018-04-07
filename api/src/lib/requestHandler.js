const requestHandler = (req, res) => {
  return async function requestHandlerOnRequest(routeHandler) {
    try {
      await routeHandler(req, res);
    } catch (error) {
      console.error('Route Level Error\n', error);

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
};

module.exports = requestHandler;
