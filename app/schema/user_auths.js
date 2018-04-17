/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_auths', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
		identityType: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		identity: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		credential: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		userRole: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'user_role',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'user_auths'
	});
};
