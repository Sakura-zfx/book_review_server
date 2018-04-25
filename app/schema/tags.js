/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tags', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tagName: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ''
		},
		cateId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'cates',
				key: 'id'
			}
		}
	}, {
		tableName: 'tags'
	});
};
