// const asyncHandler = fn => (req, res, next) =>
//   Promise
//     .resolve(fn(req, res, next))
//     .catch(next);

    
function asyncHandler(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch(error) {
      next(error);
    };
  };
};

module.exports = asyncHandler;