module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      {
        name: "UPLOAD",
        script: "index.js",
        cwd: process.cwd(),
        env: {
          COMMON_VARIABLE: "true"
        },
        env_production: {
            "PORT": process.env.UPLOAD_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.UPLOAD_MYSQL_URL_HOST,
            USER: process.env.UPLOAD_MYSQL_USERNAME_USER,
            PASSWORD: process.env.UPLOAD_MYSQL_PASSWORD,
            DATABASE: process.env.UPLOAD_MYSQL_DATABASE
        },
        env_staging: {
            "PORT": process.env.UPLOAD_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.UPLOAD_MYSQL_URL_HOST,
            USER: process.env.UPLOAD_MYSQL_USERNAME_USER,
            PASSWORD: process.env.UPLOAD_MYSQL_PASSWORD,
            DATABASE: process.env.UPLOAD_MYSQL_DATABASE
        }
      }
    ]
  };
  
