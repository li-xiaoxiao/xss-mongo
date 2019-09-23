const demo = require('./dbconfig.js')

// 数据插入
const insert = async (conditions, callback) => {
  conditions = conditions || {}
  const result = await demo.create(conditions)
  callback && callback(result)
}

// 数据查询
const find = async (conditions, callback) => {
  conditions = conditions || {}
  const result = await demo.find(conditions)
  callback && callback(result)
}

// 数据更新
const update = async (conditions, update, callback) =>  {
  const { err, res } = await demo.update(conditions, update)
  if (err) return
  callback && callback(res)
}

// 数据删除
const del = async (conditions) => {
  const { err } = await demo.remove(conditions)
  if (err) console.log('Error' + err)
}

module.exports = {
  find: find,
  del: del,
  update: update,
  insert: insert
}
