exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://testuser:123456@ds153710.mlab.com:53710/blog-app';
exports.PORT = process.env.PORT || 8080;