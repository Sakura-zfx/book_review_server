/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book_tag', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'books',
				key: 'bookId'
			}
		},
		tagId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'tags',
				key: 'id'
			}
		}
	}, {
		tableName: 'book_tag'
	});
};
