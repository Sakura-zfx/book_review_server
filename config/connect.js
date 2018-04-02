/*
 * @Author: sakura.zhang
 * @Date: 2018-03-19 15:25:42
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-03-19 18:07:09
 */
import Sequelize from 'sequelize'
import databaseConfig from './database'

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  ...databaseConfig.options
})

export default sequelize