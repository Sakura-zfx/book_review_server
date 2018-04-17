/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cates', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		cateName: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'cates'
	});
};
