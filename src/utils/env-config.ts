export default () => ({
  port: process.env.PORT || 3000,
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
  },
});
