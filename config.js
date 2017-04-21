exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://leaguetester:redmonkey@ds153730.mlab.com:53730/league-user-data';
exports.PORT = process.env.PORT || 8080;