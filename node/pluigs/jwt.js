let jwt = require('jsonwebtoken');

let secret = "secret";
//生成token
function crate_jwt(userid) {
  const payload = {
    userid: userid,
  }
  //生成token
  return jwt.sign(payload, secret, { expiresIn: 3600 })

}

function getJWTPayload(token) {
  // 验证并解析JWT
  console.log(token)
  return jwt.verify(token.split(' ')[1], secret, function (err, result) {
    if (err) {

      return "err"
    } else {
      return result;
    }
  });
}

//jwt验证token是否有效
function jwt_comfirm(fn, obj) {
  let is_login = getJWTPayload(obj.token);
  if (is_login == 'err') {
    return new Promise(resolve => {
      resolve({
        code: 0,
        msg: "请先登录"
      })
    })
  } else {
    obj.userID=is_login.userid;
    return fn(obj);
  }

}

module.exports = {
  crate_jwt,
  // getJWTPayload,
  jwt_comfirm

}