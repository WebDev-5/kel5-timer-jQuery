module.exports = {
  HOST: "localhost",
  USER: "webdev-5",
  PASSWORD: "webdev-5",
  DB: "timer",
  dialect: "postgres",
  pool: {
    max: 6,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};