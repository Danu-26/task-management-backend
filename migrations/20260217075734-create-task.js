'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            title: {
              type: Sequelize.STRING,
              allowNull: false
            },
            description: {
              type: Sequelize.TEXT
            },
            status: {
              type: Sequelize.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
              defaultValue: 'TODO'
            },
            priority: {
              type: Sequelize.ENUM('LOW', 'MEDIUM', 'HIGH'),
              defaultValue: 'MEDIUM'
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'users', key: 'id'},
                onDelete: 'CASCADE'
            },
            created_at: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
            updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')}
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    }
};
