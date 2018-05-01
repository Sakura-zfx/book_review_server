/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_collection', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		status: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			defaultValue: '0'
		},
		collectionTime: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'book_collection'
	});
};
