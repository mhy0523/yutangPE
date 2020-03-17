<template>
    <div class="register">
        <van-nav-bar
            title="注册"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        
        <van-cell-group>
            <van-field
                v-model="user.name"
                type="text"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
            />
            <van-field
                v-model="user.email"
                type="text"
                required
                clearable
                label="邮箱"
                placeholder="请输入邮箱"
            />
            <van-field
                v-model="user.tel"
                type="tel"
                required
                clearable
                label="电话"
                placeholder="请输入电话"
                @blur='checkTel'
                :error-message="msg.tel"
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
                <van-button type="info" @click="checkuser">确认注册</van-button>
                <van-button type="default">重置内容</van-button>
            </div>
        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            user:{
                name:'',
                email:'',
                tel:'',
                password:''
            },
            msg:{
                tel:''
            }
        }
    },
    created(){
    },
    methods:{
        async checkuser(){
            
             let { data:res } = await this.$http.post("user/reg",this.user);

                if(res.meta.status !== 200) return this.$toast("用户注册失败!");

                this.$toast("用户注册成功!");

                this.$router.push({
                    name:'login',
                    params:{
                        email:this.user.email
                    }
                });

        },
        checkTel(){
            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if(!TEL_REGEXP.test(this.user.tel)){
                this.msg.tel = "请输入正确的手机格式"
            }else{
                this.msg.tel = ""
            }
        },
        onClickLeft(){
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.register{
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