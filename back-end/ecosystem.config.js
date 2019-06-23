module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      {
        name: "RCA",
        script: "index.js",
        cwd: process.cwd(),
        env: {
          COMMON_VARIABLE: "true"
        },
        env_production: {
            "PORT": process.env.RCA_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.RCA_MYSQL_URL_HOST,
            USER: process.env.RCA_MYSQL_USERNAME_USER,
            PASSWORD: process.env.RCA_MYSQL_PASSWORD,
            DATABASE: process.env.RCA_MYSQL_DATABASE
        },
        env_staging: {
            "PORT": process.env.RCA_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.RCA_MYSQL_URL_HOST,
            USER: process.env.RCA_MYSQL_USERNAME_USER,
            PASSWORD: process.env.RCA_MYSQL_PASSWORD,
            DATABASE: process.env.RCA_MYSQL_DATABASE
        }
      }
    ]
  };
  