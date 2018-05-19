/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_status', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		score: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			defaultValue: '0'
		},
		time: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'book_status'
	});
};
