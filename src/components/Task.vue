<template>
    <div style="margin:20px"> 
       <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer>
        <template v-slot:[`item.status`]='{item}'>
            <div v-if='item.status==0'>无效</div>
            <div v-else-if='item.status==1'>新建</div>
            <div v-else-if='item.status==2'>执行中</div>
            <div v-else-if='item.status==3'><a @click="getAllure(item)">执行完成</a></div>
        </template>

        <template v-slot:[`item.action`]='{item}'>
            <v-btn v-if="item.status==1" color="primary" small @click="doTask(item)">执行任务</v-btn>
            <v-btn small v-else disabled>执行任务</v-btn>
        </template>
        </v-data-table>
        <!-- 表格下方添加分页-->
        <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getTaskList()" total-visible="7"></v-pagination>
    </div>
</template>
<script>
export default {
    inject:["reload"],
    data(){
        return {
            headers:[
                {text:'名称',value:'name'},
                {text:'JenkinsId',value:'testJenkinsId'},
                {text:'执行命令',value:'shortTestCommand'},
                {text:'状态',value:'status'},
                {text:'用例数量',value:'caseCount'},
                {text:'备注',value:'remark'},
                {text:'操作',value:'action'}
            ],
            tableData:[],
            alltableData:[],
            currentPage:1,
            pageLength:0,
            rows:'',
            timer: '',
            value: 0,
        }
    },
    created(){
        this.getTaskList() 
    },
    methods:{
        getTaskList(){
            let params={
                pageNum:this.currentPage,
                pageSize:5,
                
            }
            this.$api.task.getTaskList(params).then(res=>{
                this.value ++;
                console.log("执行第"+this.value+"次")
                this.alltableData=res.data.data.data
                this.rows=res.data.data.recordsTotal
                this.pageLength=Math.ceil(this.rows/5)
                //task前端做的分页，jenkins和case 都是后端做的分页
                this.tableData=this.alltableData.slice((this.currentPage-1)*5,(this.currentPage-1)*5+5)
            
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].testCommand==undefined){
                        continue;
                    }
                    if(this.tableData[i].testCommand.length>10){
                       this.tableData[i].shortTestCommand = this.tableData[i].testCommand.substring(0,20)+'...'; 
                    }
                }
                
            })
            
        },
        
        doTask(item){
            let params={ //key必须和接口文档一致，否则后端接收不到
                taskId:item.id,
                testCommand:item.testCommand
            }
            this.$api.task.doTask(params).then(res=>{
                if(res.data.resultCode==1){
                    this.$notify({
                        title:'成功',
                        message:'执行成功',
                        type:'success'
                    })
                    this.getTaskList() 
                    this.getTimeOut()
                
                }
            })
        },
        getAllure(item){
            let params={
                id:item.id
            }
            this.$api.report.getAllure(params).then(res=>{
                window.open(res.data.data.allureReportUrl,"_blank")  // _blank 默认打开一个新窗口 
            })
        },
        //实现隔15s后，任务列表再次刷新，实现了，任务状态的回写
        getTimeOut(){
            this.timer=setTimeout(this.getTaskList,15000);
        }
    },

            
    beforeDestroy() {
        clearTimeout(this.timer);
    }   
    
}
</script>
<style scoped>

</style>