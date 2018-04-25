/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('replies', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		commentId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'comments',
				key: 'id'
			}
		},
		replyId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		replyType: {
			type: DataTypes.CHAR(11),
			allowNull: true
		},
		content: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		fromUid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		},
		toUid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		}
	}, {
		tableName: 'replies'
	});
};
