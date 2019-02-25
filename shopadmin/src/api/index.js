/**
 * 封装axios进行模块化开发
 */
import axios from 'axios'
// import { resolve } from 'dns';
// import { reject } from 'q';

class axios_ {
    //接收参数
    constructor() {

        this.option = {
            url: "",
            params: "",
            method: ""
        }
    }

    //get请求
    async  get(obj) {
        /**
         * GET 发送{id:1}
         */
        let params=obj.params||{};
        let data = null;
        await axios.get(`/apis/${obj.url}`, {
            params: params
        }).then(res => {
            data = res.data
        });
        return data;
    }

    //post请求
    async post() {
        /**
         * post 发送formdata
         */
        let data = null
        await axios.post(`"/apis/${this.url}"`, this.params).then(res => {
            data = res.data
        })
        return data;
    }
}
let axios__ = new axios_();
export default axios__;