// filename: ./config/index.ejs
// app.js에서 dotenv를 설정합니다.
const env = process.env;

const development = {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    port: env.DB_PORT,
    logging: false,
};

const production = {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    port: env.DB_PORT,
    logging: env.DB_LOGGING,
};

const test = {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    port: env.DB_PORT,
    logging: env.DB_LOGGING,
};

module.exports = { development, production, test}