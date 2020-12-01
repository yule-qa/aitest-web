<template>
    <div class="sign-up">
        <h1>注册页面</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="password" type="password" label="密码"></v-text-field>
        <v-text-field v-model="email" label="邮箱"></v-text-field>
        <v-btn color="primary" @click="signUp()">注册</v-btn>
        <v-btn color="primary" @click="$router.push('/')" text>返回登录</v-btn>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:"",
            password:"",
            email:"",
        }
 
    },
    methods:{
        signUp(){
            let params={
                userName:this.username,
                password:this.password,
                email:this.email
            }
            //this.$api.user.signUp(params). 返回的是一个Promise对象
            this.$api.user.signUp(params).then(result => {
                console.log(result)
                this.$notify({             // 注册成功，页面给出提示样式
                        title: '成功',
                        message: '注册成功',
                        type: 'success'
                    });
                this.$router.push({    //注册成功后，页面跳转到哪个页（路由名字）
                    name:'Login',
                })
            });
           //上面封装好后，传入后台 ，$api这个字段之所以可以在这里用，是因为main.js里已经引入了
        }
    }
}   
</script>
<style scoped>
    .sign-up{
        width: 400px;
        text-align: center;
        position:absolute;
        margin: auto;
        left: 0;
        right: 0;
    }

</style>