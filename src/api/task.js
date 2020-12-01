import axios from './http'
//所有业务线对象，都是调用api方法， 所以这里需要查看api文件，查看接口地址，及参数
    const task = {
        addTask(params){
            return axios.post('/task' ,params)
        },
        deleteTask(params){
            return axios.delete('/task/'+params.id)
        },
        getTaskList(params){
            return axios.get('/task/list',{params})  //get请求，想要获取数据，要加上{},才能正常的向后端，后端才能正常的接收，如果没有{},后端没办法正常解析和响应
        },                                            //说白了，就是get请求，不加{}，url上没办法增加"?key=value&key=value"
        doTask(params){
            return axios.post('/task/start',params)
        }
}

export default task; 