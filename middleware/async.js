const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next);

// async function asyncHandler(fn) {
//   try {
//     await fn(req, res, next); 
//   } catch(err) {
//     next(err);
//   };
// };

module.exports = asyncHandler;