/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comments', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		topicId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'comment_type',
				key: 'id'
			}
		},
		topicType: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'books',
				key: 'bookId'
			}
		},
		fromUid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'userId'
			}
		}
	}, {
		tableName: 'comments'
	});
};
