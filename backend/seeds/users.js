// seeds/users.js

const { sequelize, User } = require('../backend/models');

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true }); // Recreates tables

    await User.bulkCreate([
      {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123',
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: 'password123',
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'password123',
      },
    ]);

    console.log('✅ Users seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
