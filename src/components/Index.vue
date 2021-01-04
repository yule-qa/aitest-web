<template>
    <div>
        <v-app-bar dark dense>   <!-- 导航背景图-->
            <v-toolbar-title style="width:100px">AITEST</v-toolbar-title>
            <v-tabs  v-model="active" @change="change">
                <v-tab @click="$router.push('/jenkins')">Jenkins管理</v-tab>
                <v-tab @click="$router.push('/case')">用例管理</v-tab>
                <v-tab @click="$router.push('/task')">任务管理</v-tab>
                <v-tab @click="$router.push('/report')">报告管理</v-tab>
            </v-tabs>
            <v-btn @click="logout()">退出</v-btn>
        </v-app-bar>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
             active: 0  //  导航默认下标是 0 指向的首页
        }
    },
    created() {
    this.active = JSON.parse(localStorage.getItem('active'))  // 每次进入组价的时候 从本地缓存中取
    },
    // 每次 改变将改变的数值 存入 本地缓存中
    methods:{
        change(active){
            localStorage.setItem('active', active)
        },
        logout(){
            let params= {
                    token:localStorage.getItem('token')
            } 
            this.$api.user.logout(params).then(
                res =>{
                    localStorage.removeItem('active',active)
                    this.$router.push('/')
                }
            )
        }
    },

    watch:{
        $route(){
            switch(this.$route.path){
                case '/jenkins':
                    this.active=0
                    break
                case '/case':
                    this.active=1
                    break
                case '/task':
                    this.active=2
                    break
                case '/report':
                    this.active=3
                    break
                default:
                    this.active=-1
                    break
            }
        }
    }
}
</script>
<style scoped>

</style>