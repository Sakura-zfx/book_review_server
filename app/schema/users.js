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
		trueName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		birth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(300),
			allowNull: true,
			defaultValue: ''
		},
		registerDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		presentation: {
			type: DataTypes.STRING(2000),
			allowNull: true
		}
	}, {
		tableName: 'users'
	});
};
