import axios from './http'
//所有业务线对象，都是调用api方法， 所以这里需要查看api文件，查看接口地址，及参数
    const cases = {
        addCaseText(params){
            return axios.post('/testCase/text' ,params)
        },
        // 重写了 http.js里的方法，使用私有的headers
        addCaseFile(params){
            return axios('/testCase/file',{
                method:'post',
                data:params,
                headers:{'Content-type':'multipart/form-data'}
            })
        },
        deleteCase(params){
            return axios.delete('/testCase/'+params.id)
        },
        getCasesList(params){
            return axios.get('/testCase/list',{params})
        }
}

export default cases;