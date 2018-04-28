/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_score', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		score: {
			type: "DOUBLE(3,2)",
			allowNull: true,
			defaultValue: '0.00'
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'books',
				key: 'bookId'
			}
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
		publishTime: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'book_score'
	});
};
