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
			allowNull: false,
			defaultValue: ''
		},
		bookPic: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		publishHouse: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		publishDate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		pageNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		price: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: '0.00'
		}
	}, {
		tableName: 'books'
	});
};
