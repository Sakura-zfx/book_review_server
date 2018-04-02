/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('books', {
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		bookName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		bookPic: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		publishHouse: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		publishDate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		pageNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		}
	}, {
		tableName: 'books'
	});
};
