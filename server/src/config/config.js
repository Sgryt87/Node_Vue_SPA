module.exports = {
  port: 3030,
  app: process.env.NODE_ENV || 'dev',
  db: {
    dialect: process.env.DB_DIALECT || 'mongodb',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    host: process.env.HOST || '://localhost:27017/',
    database: process.env.DB_NAME || 'photography'
  },
  authentication: {
    jwt_encryption: process.env.JWT_SECRET || 'secret_token',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000000000'
  },
  salt: {
    encryption: process.env.SALT || 'secret_salt',
    rounds: process.env.SALT_ROUNDS || 10
  }
}
