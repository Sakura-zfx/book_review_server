/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_auths', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
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
			type: DataTypes.STRING(32),
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
		}
	}, {
		tableName: 'user_auths'
	});
};
