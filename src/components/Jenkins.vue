<template>
    <div style="margin:20px">
        <v-btn color="primary" @click="openDiolog()">添加Jenkins</v-btn>
        <!--添加对话框，并双向绑定,addDialog为他的命名，下方用的地方，都this.addDialog-->
        <v-dialog v-model="addDialog" max-width="400px"> 
            <v-card>
                <v-card-title>{{dialogTitle}}</v-card-title>
                <v-card-text>
                    <v-text-field v-model="addItems.name" label="名称"></v-text-field>
                    <v-text-field v-model="addItems.testCommand" label="测试命令"></v-text-field>
                    <v-text-field v-model="addItems.url" label="Jenkins地址"></v-text-field>
                    <v-text-field v-model="addItems.userName" label="用户名"></v-text-field>
                    <v-text-field v-model="addItems.password" label="密码" type="password"></v-text-field>
                    <v-select v-model="addItems.commandRunCaseType" :items="items" label="选择类型"></v-select>
                    <v-text-field v-model="addItems.commandRunCaseSuffix" label="文件后缀"></v-text-field>
                    <v-text-field v-model="addItems.remark" label="备注"></v-text-field>
                    <v-checkbox v-model="addItems.defaultJenkinsFlag" label="设为默认"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- 添加对话框，按钮显示确认 -->
                    <v-btn color="primary" v-if="dialogTitle=='添加Jenkins'" @click="saveJenkins()">确认</v-btn>  
                    <!-- 编辑对话框，按钮显示确认编辑 -->
                    <v-btn color="primary" v-else @click="saveEditJenkins()">确认编辑</v-btn>
                    <v-btn color="primary" @click="close()" text>取消</v-btn>
                </v-card-actions>
            </v-card>  
        </v-dialog> 
        <!-- 展示页面列表 -->
        <v-data-table 
        :headers="headers"
        :items="tableData"
        hide-default-footer>
        <template v-slot:[`item.action`]='{item}'>
            <v-btn color="success" small @click="editJenkins(item)">编辑</v-btn>
            <v-btn color="error" small @click="deleteJenkins(item)">删除</v-btn>
        </template>
        <template v-slot:[`item.commandRunCaseType`]='{item}'>
            <div v-if="item.commandRunCaseType==1">文本</div>
            <div v-if="item.commandRunCaseType==2">文件</div>
        </template>
        <template v-slot:[`item.defaultJenkinsFlag`]='{item}'>
            <div v-if="item.defaultJenkinsFlag==1">是</div>
            <div v-if="item.defaultJenkinsFlag==0">否</div>
        </template>
        </v-data-table>  
        <!--分页 -->
        <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getJenkinsList()" total-visible="7"></v-pagination>

    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            dialogTitle:'添加Jenkins',
            addDialog:false,
            jenkinsName:'',
            currentPage:1,
            pageLength:0,
            rows:'',
            headers:[                     // text 是前端展示的名字，value 后面的内容要和后端接口返回的字段一致
                {text:'ID',value:'id'},
                {text:'名称',value:'name'},
                {text:'测试命令',value:'testCommand'},
                {text:'Jenkins地址',value:'url'},
                {text:'测试用例类型',value:'commandRunCaseType'},
                {text:'测试用例文件后缀',value:'commandRunCaseSuffix'},
                {text:'是或否为默认项',value:'defaultJenkinsFlag'},
                {text:'备注',value:'remark'},
                {text:'操作',value:'action'},
            ],
            addItems:{
                id:'', 
                name:'',
                testCommand:'',
                url:'',
                userName:'',
                password:'',
                commandRunCaseType:'',
                commandRunCaseSuffix:'',
                remark:'',
                defaultJenkinsFlag:''
            },
             items:[
                {text:'文本',value:1},
                {text:'文件',value:2},
            ]
        }
    },
    created(){       // vue生命周期，一进入这个页面，就执行这个方法
        this.getJenkinsList()
    },
    methods:{
        editJenkins(item){
            this.dialogTitle='编辑Jenkins',  //对话框title命名
            this.addItems.name=item.name,       //item为列表值，将列表的值，复制给addItems，这样打开对话框，各项里就会有初始值了
            this.addItems.id=item.id,      
            this.addItems.testCommand=item.testCommand,
            this.addItems.url=item.url,
            this.addItems.userName=item.userName,
            this.addItems.password=item.password,
            this.addItems.commandRunCaseType=item.commandRunCaseType,
            this.addItems.commandRunCaseSuffix=item.commandRunCaseSuffix,
            this.addItems.remark=item.remark,
            this.addItems.defaultJenkinsFlag=item.defaultJenkinsFlag,
            this.addDialog= true //打开消息对话框，
        },
        deleteJenkins(item){
            let params={        //准备数据
                id:item.id
            }
            this.$api.jenkins.deleteJenkins(params).then(res=>{  
                this.getJenkinsList()
                this.$notify({
                    title:'成功',
                    message:'已经成功删除',
                    type:'success'
                })
            })
        },
        getJenkinsList(){
            let params={
                    pageNum:this.currentPage,
                    pageSize:5
                }
            this.$api.jenkins.getJenkinsList(params).then(res=>{
                console.log(res)
                this.tableData=res.data.data.data
                this.rows=res.data.data.recordsTotal
                this.pageLength=Math.ceil(this.rows/5)
            })
        },
        openDiolog(){
            this.dialogTitle = '添加Jenkins'  //对话框title命名
            this.addDialog = true //打开消息对话框，
        },
        saveJenkins(){
            let params = {       //从页面中添加的数据，获取到这里，然后准备调用api对象，发送请求
                commandRunCaseSuffix:this.addItems.commandRunCaseSuffix,
                commandRunCaseType:this.addItems.commandRunCaseType,
                defaultJenkinsFlag:this.addItems.defaultJenkinsFlag?1:0,
                name:this.addItems.name,
                password:this.addItems.password,
                remark:this.addItems.remark,
                testCommand:this.addItems.testCommand,
                url:this.addItems.url,
                userName:this.addItems.userName
            }
            this.$api.jenkins.addJenkins(params).then(res=>{
                console.log(res)
                this.$notify({
                    title:'成功',
                    message:'添加成功',
                    type:'success'
                })
                this.close()   // 保存成功，关闭会话框
                this.getJenkinsList()  //刷新页面列表

            })
        },
        saveEditJenkins(){
            let params ={
                id:this.addItems.id,
                commandRunCaseSuffix:this.addItems.commandRunCaseSuffix,
                commandRunCaseType:this.addItems.commandRunCaseType,
                defaultJenkinsFlag:this.addItems.defaultJenkinsFlag?1:0,
                name:this.addItems.name,
                password:this.addItems.password,
                remark:this.addItems.remark,
                testCommand:this.addItems.testCommand,
                url:this.addItems.url,
                userName:this.addItems.userName
            }
            this.$api.jenkins.editJenkins(params).then(res=>{
                console.log(res)
                this.$notify({
                    title:'成功',
                    message:'修改成功',
                    type:'success'
                })
                this.close()
                this.getJenkinsList()
            }

            )
        },
        close(){
            this.addDialog=false
        }
    }
}
</script>
<style scoped>

</style>