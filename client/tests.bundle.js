var context = require.context('.', true, /.+\.[test]|[spec]\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
