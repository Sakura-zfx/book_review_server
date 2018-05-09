/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comments', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		title: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		score: {
			type: "DOUBLE(3,2)",
			allowNull: true,
			defaultValue: '0.00'
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
		},
		publishTime: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'comments'
	});
};
