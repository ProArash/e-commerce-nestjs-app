export default () => ({
  port: process.env.PORT || 3000,
  hash_salt: process.env.HASH_SALT || 10,
  jwt_secret: process.env.JWT_SECRET || "secret",
  database: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    db_name: process.env.DB_NAME || "test_db",
  },
});
