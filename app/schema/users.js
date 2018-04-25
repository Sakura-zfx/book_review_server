/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nickName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		picture: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		userGender: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ''
		},
		tureName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		birth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ''
		},
		registerDate: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'users'
	});
};
