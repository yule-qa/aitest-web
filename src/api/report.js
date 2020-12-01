import axios from './http'
const report={
    getAllure(params){
        return axios.get('/report/allureReport'+params.id )
    },
    getCaseCount(){
        return axios.get('/report/taskByCaseCount')
    }
}
export default report;