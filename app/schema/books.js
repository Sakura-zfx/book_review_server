/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('books', {
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		isbn10: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ''
		},
		isbn13: {
			type: DataTypes.STRING(13),
			allowNull: true,
			defaultValue: ''
		},
		bookName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		originName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		authorList: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		bookPic: {
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
			type: DataTypes.STRING(20),
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
		},
		altName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		subName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		binding: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		summary: {
			type: DataTypes.STRING(2000),
			allowNull: true,
			defaultValue: ''
		}
	}, {
		tableName: 'books'
	});
};
