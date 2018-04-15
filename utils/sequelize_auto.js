/*
 * @Author: sakura.zhang
 * @Date: 2018-03-19 15:36:39
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-12 20:42:06
 */
import SequelizeAuto from 'sequelize-auto'
import databaseConfig from '../config/database'

const auto = new SequelizeAuto(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  ...databaseConfig.options,
  directory: './app/schema'
})

auto.run(error => {
  if (error) {
    throw error
  }

  console.log(auto.tables)
})