const paginate = require('express-paginate');

async function pagination(model, req) {
  const [results, itemCount] = await Promise.all([
    model.find({}).limit(req.query.limit).skip(req.skip).lean()
      .exec(),
    model.count({}),
  ]);
  const pageCount = Math.ceil(itemCount / req.query.limit);
  return {
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: results,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
  };
}

module.exports = {
  pagination,
};
