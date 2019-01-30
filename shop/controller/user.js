

let user=require("./../server/user");

function user_serach(){
  return  user.user_serach();
}

function user_add_black(obj){
  return  user.user_add_black(obj);
}

module.exports={
    user_serach,
    user_add_black
}

