import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router';  

var mesIns =null
var api=process.env.API  //process 为vue 提供的一个进程，通过进程，可以获取到config文件夹下，dev.evn.js里的API值，当前的baseURL地址
var instance = axios.create({
    headers :{
         'Content-Type' :'application/json' ,
    },
    // baseURL :api
    baseURL :api
})

//添加一个拦截器，用于在发送请求时候，在请求头的common参数里添加token值
instance.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        config.headers.common['token']=localStorage.getItem('token')
    }
    return config
})
//添加一个拦截器，用于在接受到响应消息的时候，如果响应正确,正常进行then 操作，如果是黑白重定向
instance.interceptors.response.use(res=>{
    if(res.data.resultCode==1){
        return Promise.resolve(res)     //响应值成功，正常跳转
    }else{  //响应非成功，给与提示
        //如果页面已经存在提示信息，则先关闭，再显示
        if(mesIns){
            mesIns.close()
        }

        mesIns = Message({
            type: 'error',
            message: res.data.message,
            center: true
        })
        return Promise.reject(res)
    }
    
}, error=>{
    const {response} =error
    if(response.status == 401){
        if (mesIns){
            mesIns.close()
        }
        mesIns=Message({
            type:'error',
            message: response.data.message,
            center:true
        })
        router.replace({
            path:'/',
            query:{
                redirect: router.currentRoute.fullPath
            }
        })
    }
    return Promise.reject(response)
})


export default instance;