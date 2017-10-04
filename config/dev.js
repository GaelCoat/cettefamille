var env = process.env.NODE_ENV || 'local';

var config = {
  port: process.env.PORT || 6969,
  session: {
    secret: "urMom4intn0b1Tch!",
    cookie: {
      maxAge : 86400000,
      secure: false,
    },
    saveUninitialized: true,
    resave: true
  },
  mongo: {
    api: {
      host: process.env.MONGODB_ADDON_URI || "mongodb://localhost/cettefamille"
    }
  },
  mail: {
    api: '4587265ac3350349b4dfbda0f46f768e',
    secret: '1c11d85389b11fc04867c00e3ea883fb',
    from: 'stevelerobot@cettefamille.fr'
  }
}

module.exports = config;
