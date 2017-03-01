exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://atugman:unc123@ds157529.mlab.com:57529/arcade';
exports.PORT = process.env.PORT || 8080;