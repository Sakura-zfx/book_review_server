/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('authors', {
		authorId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		authorName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		authorPic: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		authorGender: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		birth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		authorIntro: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		authorWorks: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'authors'
	});
};
