/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_author', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		authorId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'authors',
				key: 'authorId'
			}
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'books',
				key: 'bookId'
			}
		}
	}, {
		tableName: 'book_author'
	});
};
