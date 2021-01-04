<template>
    <div class="login">
        <h1>登录</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="password" type="password" label="密码"></v-text-field>
        <v-btn small color="primary" @click="signIn()">登录</v-btn>
        <v-btn small color="primary" @click="$router.push('/signup')" text>注册新用户</v-btn>
         
    </div>
</template>  
<script>
    export default {
        data(){
            return{
                username:'',
                password:'',
            }
        },
        methods:{   
            signIn(){
                let params = {  
                    userName : this.username ,
                    password : this.password
                }
                this.$api.user.signIn(params).then(res=>{
                    console.log(res)
                    localStorage.setItem("active",0)
                    localStorage.setItem("token",res.data.data.token)  //前端保存token，用于以后的接口操作
                    this.$notify({
                        title: '成功',
                        message: '登录成功',
                        type: 'success'
                    });
                    this.$router.push('/jenkins')
                })
            }
        }

    }
</script>
<style scoped>
    .login{
        width: 400px;
        text-align: center;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
    }
</style>