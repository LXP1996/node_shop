export default[{
    path:"/goodsType",//商品类型路由
    name:"goodsType",
    component:()=>import('@/views/goods/goodstype.vue')
},{
    path:"/goodsOnline",//商品发布路由
    name:"goodsOnline",
    component:()=>import('@/views/goods/goodsonline.vue')
},{
    path:"/goodsList",
    name:"goodslist",
    component:()=>import('@/views/goods/goodslist.vue')
}]