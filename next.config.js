module.exports = {
  env: {
    BASE_URL: "http://localhost:8000",
    TEST_URL: "http://localhost:8000",
    DB_HOST: "mysql-35504-0.cloudclusters.net",
    DB_USER: "admin",
    DB_PASS: "wW4uEswi",
    DB_NAME: "fnmotivation",
    DB_PORT: "35504",
    ACCESS_TOKEN_SECRET:
      "DB80C7415634E2262A26B3FD7B8717BA96B60DD9174AFEEF17400D3D199E5B1EKJHAISTUASG%^&$%&()*",
    REFRESH_TOKEN_SECRET:
      "8F02AAFC1A1E74511872F901E45187623D4982189BAD117E70677C5A4F7E3DCC^&GATS&^%$^&",
    RECAPTCHA_KEY: "6LdH5mMaAAAAALlyeFqMa7Qz0JdRyU6HTs8zNlWl",
    AWS_REGION: "us-east-1",
    AWS_ACCESSKEY: "AKIAQO57B24TV5WH5A77",
    AWS_SECRETKEY: "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",
    EM_USER: "info@fnmotivation.com",
    GOOGLE_ID:
      "511879007564-pv2n0eocnbpqqrt8kjlo29nh2lc0pb14.apps.googleusercontent.com",
    GOOGLE_CIENT_ID:
      "853847782605-2btunrrc2n7rkuk9ourbrg3nb2dvp4p5.apps.googleusercontent.com",
    APPLE_CIENT_ID: "com.fnmotivation.fnmotivation",
    FACEBOOK_ID: "832351900781942",
    AWS_BUCKET_NAME: "fnm-uploads",
    AWS_BUCKET_ACCESS_KEY: "AKIAQO57B24TV3FLXN5S",
    AWS_BUCKET_SECRET_KEY: "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",
    S3_UPLOAD_KEY: "AKIAQO57B24TV3FLXN5S",
    S3_UPLOAD_SECRET: "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",
    S3_UPLOAD_BUCKET: "fnm-uploads",
    S3_UPLOAD_REGION: "us-east-1",
    webpack: (config) => {
      config.module.rules.push({
        test: /\.json$/,
        loader: "json-loader",
      });
      return config;
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: [{ loader: "html-loader" }],
    });
    return config;
  },
};
