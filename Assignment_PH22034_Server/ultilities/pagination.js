const paginate = async (model, condition, itemsPerPage, page, req, populateName) => {
    const startIndex = (page - 1) * itemsPerPage;
  
    const totalItems = await model.countDocuments(condition);
    const pageCount = Math.ceil(totalItems / itemsPerPage);
  
    const items = await model
      .find(condition)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sortable(req)
      .populate(populateName);
  
    return {
      items,
      pageCount,
      totalItems,
    };
  };
  
  module.exports = paginate;