import axios from './http'
//所有业务线对象，都是调用api方法， 所以这里需要查看api文件，查看接口地址，及参数
    const user = {
        signIn(params){
            return axios.post( '/user/login' ,params)
        },
        signUp(params){
            return axios.post('/user/register',params)
        },
        logout(params){
            return axios.delete('/user/logout',params)
        }
}

export default user;