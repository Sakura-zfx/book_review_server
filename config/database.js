/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:48:17
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-03-19 15:30:57
 */
const databaseConfig = {
  database: 'book_review',
  username: 'root',
  password: 'root',
  options: {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    timezone: '+8:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false
    }
  }
}

export default databaseConfig