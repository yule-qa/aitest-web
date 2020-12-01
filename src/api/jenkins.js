import axios from './http'
//所有业务线对象，都是调用api方法， 所以这里需要查看api文件，查看接口地址，及参数
    const jenkins = {
        addJenkins(params){
            return axios.post( '/jenkins' ,params)
        },
        getJenkinsList(params){
            return axios.get('/jenkins/list',params)
        },
        deleteJenkins(params){
            return axios.delete('/jenkins/'+params.id)
        },
        editJenkins(params){
            return axios.put('/jenkins',params)
        }
}

export default jenkins;