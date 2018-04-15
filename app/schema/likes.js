/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('likes', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		typeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		timestamps: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'likes'
	});
};
