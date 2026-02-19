'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Index for filtering by user
    await queryInterface.addIndex('tasks', ['user_id'], {
      name: 'idx_tasks_user_id'
    });

    // Combined index for filtering + sorting
    await queryInterface.addIndex('tasks', ['user_id', 'created_at'], {
      name: 'idx_tasks_user_created'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('tasks', 'idx_tasks_user_id');
    await queryInterface.removeIndex('tasks', 'idx_tasks_user_created');
  }
};
