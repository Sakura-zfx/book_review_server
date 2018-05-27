/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recommend', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
		bookList: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		time: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'recommend'
	});
};
