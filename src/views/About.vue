<template>
    <div class="about">
        <div class="top">
            <div class="title">个人中心</div>
            <template v-if="isLogin">
            <div class="touxiang"><img :src="user.icon" alt=""></div>
            <div class="name">{{user.name}}</div>
            <input class="upload" @change='add_img($event)'  type="file" value="上传头像">
            </template>
            <template v-else>
            <div class="touxiang"><img src="../img/ceshi.jpg" alt=""></div>
            <div class="name" @click="login">请登录</div>
            </template>
        </div>

        <div class="btnList">
    		<van-cell-group>
			  <van-cell class="dingdan" title="我的订单" is-link />
			  <van-cell class="huodong" title="我的活动" is-link to="my_game"/>
			  <van-cell class="yijian" title="我的场馆" is-link/>
			  <van-cell class="yijian" title="意见反馈" is-link/>
			    <van-cell class="tuichu" title="退出登录" is-link @click="loginOut"/>
			</van-cell-group>
    		
    	</div>

    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            user:{
                name:'',
                icon:require('@/img/ceshi.jpg')
            },
            isLogin:true
        }
    },
    created(){
        this.getuser()
        
    },
    methods:{
        async add_img(ev){
            let img = ev.target.files[0]
            let form = new FormData()
            form.append('icon',img,img.name)
            let { data:res } = await this.$http.post('user/save_icon',form)
            this.user = res.data;
        },
        async getuser(){
            let { data:res } = await this.$http.get('user')
            console.log(res);
            
            this.user = res;
            this.user.icon =  res.data.icon == "http://127.0.0.1/yutang_api/public/upload/" ? require('@/img/ceshi.jpg') : res.data.icon
            this.user.name = res.data.name
            
        },
        loginOut(){
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
        },
        login(){
            this.$router.push('/login')
        },
    }
}
</script>
<style lang="less" scoped>
.about{
    height: 100vh;
    background-color: #f7f9f8;
    .top{
        height: 320px;
        background-color: #3498ed;
        padding: 30px;
        box-sizing: border-box;
        position: relative;
        .upload{
            position: absolute;
            bottom: 118px;
            left: 312px;
            width: 125px;
            height: 125px;
            opacity: 0;
        }
        .title{
            color: white;
            font-size: 35px;
        }
        .touxiang{
            width: 125px;
            height: 125px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .name{
            color: white;
            text-align: center;
            font-size: 35px;
            margin-top: 30px;
        }
    }
    .btnList{
        background-color: white;
        padding:0 30px;
        margin-top: 10px;
        .dingdan,.youhuiquan,.yijian,.tuichu,.huodong{
            border-bottom: 1px #e6e6e6 solid;
            display: flex;
            justify-content: space-between;
            font-size: 30px;
        }
    }
}
</style>