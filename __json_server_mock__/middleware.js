/*
 * @Author: 王鑫
 * @Description: 登陆中间件
 * @Date: 2022-03-28 13:23:40
 */
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/sys/login') {
    if (req.body.username === 'super-admin' && req.body.password === '123456') {
      return res.status(200).json({
        success: true,
        data: {
          token: 'd8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0ƒ'
        },
        message: '登陆成功'
      })
    } else {
      return res.status(400).json({ message: '用户名或者密码错误' })
    }
  }
  next()
}
