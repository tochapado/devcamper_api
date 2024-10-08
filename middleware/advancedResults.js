const advancedResults = function(model, populate) {
  return async function(req, res, next) {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    for(let i = 0; i < removeFields.length; i++) {
      if(reqQuery[removeFields[i]]) {
        delete reqQuery[removeFields[i]];
      };
    };

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, function(match) {
      return '$' + match;
    });

    // Finding resource
    query = model.find(JSON.parse(queryStr));

    // Select Fields
    if(req.query.select) {
      const fields = req.query.select;
      let fieldString = '';

      for(let i = 0; i < fields.length; i++) {
        if(fields[i] === ',') {
          fieldString = fieldString + ' ';
          continue;
        };
        fieldString = fieldString + fields[i];
      };
      query = query.select(fieldString);
    };

    // Sort
    if(req.query.sort) {
      const sortBy = req.query.sort;
      let sortByString = '';

      for(let i = 0; i < sortBy.lenth; i++) {
        if(sortBy[i] === ',') {
          sortByString = sortByString + ' ';
          continue;
        };
        sortByString = sortByString + sortBy[i];
      };
      query = query.sort(sortByString);
    } else {
      query = query.sort('-createdAt');
    };

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate) {
      query = query.populate(populate);
    };

    // Executing query
    const results = await query;

    // Pagination result
    const pagination = {};

    if(endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    };

    if(startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    };

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination: pagination,
      data: results,
    };

    next();
  };
};

module.exports = advancedResults;