/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_role', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		roleName: {
			type: DataTypes.STRING(50),
			allowNull: false
		}
	}, {
		tableName: 'user_role'
	});
};
