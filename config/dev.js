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
  },
  s3: {
    accessKeyId: process.env.CELLAR_ADDON_KEY_ID || "NRUZF_UYV-2K-9NIIXOY",
    secretAccessKey: process.env.CELLAR_ADDON_KEY_SECRET || "2QlgnMRyb3nQrMudCvoO1MtgtQAea9Aj7XH84A==",
    endpoint: process.env.CELLAR_ADDON_HOST || "cellar.services.clever-cloud.com",
    bucket: 'cette-famille',
    host: 'https://cellar.services.clever-cloud.com/cette-famille/',
    proxy: 'http://cette-famille.cleverapps.io/medias/'
  }
}

module.exports = config;
