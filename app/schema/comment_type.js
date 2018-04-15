/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment_type', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		commentType: {
			type: DataTypes.CHAR(255),
			allowNull: true
		}
	}, {
		tableName: 'comment_type'
	});
};
