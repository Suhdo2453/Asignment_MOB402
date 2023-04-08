const sortablePlugin = function (schema, options) {
    schema.query.sortable = function (req) {
      if (req.query.hasOwnProperty('sort')) {
        let isValidate = [1, -1].includes(Number(req.query.order));
        let check = isValidate ? {
            [req.query.sort]: isValidate ? req.query.order : -1,
          }:null;
        return this.sort(check);
      }
      return this;
    };
  };
  module.exports = sortablePlugin;