import axios_ from '@/api/index.js'
//获取商品基础信息
export const query_goods_base=()=> {
    let obj={
        method:"get",
        url:"api/goodsProduct/serach",
    }
  return  axios_.get(obj);
}
//获取商品类型
export const query_goodsType=(fid)=>{
  let obj={
    params:{
     fid:fid
    },
    method:"get",
    url:"api/goodsType/serach",
}
return  axios_.get(obj);
}

//存储商品基础信息
export const saveBaseGoods=(obj)=>{

  return axios_.post("api/goodsBase/add",obj);
}