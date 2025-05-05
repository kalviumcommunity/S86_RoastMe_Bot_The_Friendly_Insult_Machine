// seed.js
const { sequelize } = require('./config/database');
const { User, Entity } = require('./models');  // Adjusted to import from models/index.js

const seed = async () => {
  try {
    // Sync the database (force: true will drop the table if it exists)
    await sequelize.sync({ force: true });

    // Seed Users
    const users = await User.bulkCreate([
      { name: 'Khalid', email: 'khalid@example.com', username: 'khalid' },
      { name: 'Tanveer', email: 'tanveer@example.com', username: 'tanveer' },
      { name: 'Ravi', email: 'ravi@example.com', username: 'ravi' },
    ]);

    // Seed Entities
    await Entity.bulkCreate([
      { name: 'Roast 1', description: '🔥', created_by: users[0].id },
      { name: 'Roast 2', description: '🔥🔥', created_by: users[1].id },
      { name: 'Roast 3', description: '🔥🔥🔥', created_by: users[2].id },
    ]);

    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding:', err);
  } finally {
    await sequelize.close();
  }
};

seed();
