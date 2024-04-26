import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'root', '123456789', {
	host: 'localhost',
	dialect: 'mysql',
	// logging: false,
});

export default db;
