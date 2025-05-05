// config/database.js
require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,       // e.g., 'asap_db'
  process.env.DB_USER,       // e.g., 'root'
  process.env.DB_PASSWORD,   // e.g., 'password'
  {
    host: process.env.DB_HOST,     // e.g., 'localhost'
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Optional: turn off Sequelize's SQL logging
  }
);

// Function to test the DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully');
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
