/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment_type', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		commentType: {
			type: DataTypes.CHAR(255),
			allowNull: true,
			defaultValue: ''
		}
	}, {
		tableName: 'comment_type'
	});
};
