

let user=require("./../server/user");

function user_serach(){
  return  user.user_serach();
}

function user_add_black(obj){
  return  user.user_add_black(obj);
}

function user_add(obj){
  return  user.user_add(obj);
}

function user_login(obj){
  return  user.user_login(obj);
}


module.exports={
    user_serach,
    user_add_black,
    user_add,
    user_login
}

