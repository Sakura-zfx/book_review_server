/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('authors', {
		authorId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		authorName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		authorPic: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		authorGender: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ''
		},
		birth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		authorIntro: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'authors'
	});
};
