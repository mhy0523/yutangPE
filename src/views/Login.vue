<template>
    <div class="login">
        <van-nav-bar
            title="用户登录"
            />
        
        <van-cell-group>
            <van-field
                v-model="user.email"
                type="text"
                required
                clearable
                label="邮箱"
                placeholder="请输入邮箱"
            />
            <van-field
                v-model="user.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
            </van-cell-group>

            <div class="btnList">
                <van-button type="info" @click="denglu">登录</van-button>
                <van-button type="default" @click="zhuce">注册</van-button>
            </div>
        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            user:{
                email:'',
                password:'',
                nextRouter:''
            },
            
        }
    },
    created(){
        this.user.email = this.$route.params.email;
    },
    methods:{
        zhuce(){
            this.$router.push('/register')
        },
        
        checkTel(){
            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if(!TEL_REGEXP.test(this.user.tel)){
                this.msg.tel = "请输入正确的手机格式"
            }else{
                this.msg.tel = ""
            }
        },
        async denglu(){
            let { data:res } = await this.$http.post('user/login',this.user)
            if( res.status !== 200) return this.$toast('邮箱或密码输入有误')
            sessionStorage.setItem("token",res.data.api_token);
            this.$router.push('/venue');
        },
    },
    // beforeRouteEnter(to,from,next){
    //     next(vm=>{
    //         vm.nextRouter = from.path;
    //     });                            
       
       
    // },
}
</script>
<style lang="less" scoped>
.login{
    .van-nav-bar{
        background-color: #3399ee;
    }
    .van-nav-bar__title{
        color: white;
    }
    .van-nav-bar__text {
         color: white;
    }
    .van-nav-bar .van-icon{
        color: white;
    }
    .btnList{
        margin-top: 100px;
        display: flex;
        justify-content: space-around;
    }
}
</style>