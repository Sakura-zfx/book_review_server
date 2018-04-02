/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_score', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		score: {
			type: "DOUBLE(3,2)",
			allowNull: true
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
		}
	}, {
		tableName: 'book_score'
	});
};
