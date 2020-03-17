<template>
    <div class="find">
        <van-nav-bar title="朋友圈" left-arrow>
            <van-icon name="photograph" slot="right" @click="editMsg"/>
        </van-nav-bar>
        <div class="body">
            <div class="msg" v-for="(msg,index) in msgList" :key="msg.id">
                <img class="usericon" :src="msg.user.icon_url == 'http://127.0.0.1/yutang_api/public/upload/' ? usericon:msg.user.icon_url" alt="">
                <div class="msg_wrap">
                    <div class="name">{{msg.user.name}}</div>
                    <div class="des" ref="des">{{msg.message}}</div>
                    <div ref="full" @click="isFull(index)" class="ds full">{{text}}</div>
                    <div class="picList" >
                        <img :src="pic" alt="" v-for="(pic,index) in msg.imgs" :key="pic" @click="imgpre(msg.imgs,index)">
                    </div>
                    <div class="time"><div class="time_num">{{msg.updated_at}}</div><div class="more"><van-icon name="weapp-nav" /></div></div>
                </div>
            </div>
            <div class="getmore" v-if="!isFinish" @click="getMore">加载更多<van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" /></div>
        </div>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {                                               
    data(){
        return{
            msgList:[],
            page:1,
            isLoading:false,
            isFinish:false,
            usericon:require('@/img/ceshi.jpg'),
            text:'全文'
        }
    },
    created(){
        this.getMsgs()
        this.scroll()
    },
    updated(){
        this.off()
    },
    methods:{
        isFull(index){
            let p = this.$refs.des;
            if(p[index].classList.contains('san')){
                p[index].classList.remove('san')
                this.text = '收起'

            }else{
                p[index].classList.add('san')
                this.text = '全文'
            }
        },
        off(){
            let p = this.$refs.des;
            let h = this.$refs.full;

            p.filter((item,index)=>{
                if(item.offsetHeight>60){
                    item.classList.add('san')
                    h[index].classList.remove('ds')
                }
            })
        },
        imgpre(imgArr,index){
            ImagePreview({
                images:imgArr,
                startPosition: index
            });
        },
        scroll(){
            window.onscroll = ()=>{
            let clientHeight = document.documentElement.clientHeight;
            let offsetHeight = document.documentElement.offsetHeight;
            let scrollTop = document.documentElement.scrollTop;
            if(scrollTop  >= offsetHeight - clientHeight-50){
                this.getMore()
            }
            }
        },
        getMore(){
            if(this.isLoading == true || this.isFinish == true) return false ;
            this.page ++;
            this.getMsgs()
        },
        async getMsgs(){
            this.isLoading = true;
            let { data:res } = await this.$http.get('/user/friend_msgs?page='+this.page)
            this.msgList = this.msgList.concat(res.data)
            this.isLoading = false;
            console.log(res);
            if(res.last_page == this.page) this.isFinish = true
        },
        back(){
            this.$router.back()
        },
        editMsg(){
            this.$router.push('/create_friend_msg')
        }
    },
    beforeDestroy(){
        window.onscroll = null
    }
}
</script>
<style lang="less">
.find{
    .san{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .van-nav-bar{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
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
    .body{
        margin-top: 92px;
        margin-bottom: 100px;
        .msg{
            display: flex;
            padding: 30px 40px;
            border-bottom: 1px #f4f4f4 solid;
            .usericon{
                width: 80px;
                height: 80px;
                border-radius: 15px;
            }
            .msg_wrap{
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                width: 100%;
                .name{
                    font-size: 30px;
                    color: #3b5683;
                }
                .des{
                    font-size: 30px;
                    line-height: 40px;
                    margin-top: 10px;
                    width: 500px;
                }
                .full{
                    font-size: 30px;
                    color: #3b5683;
                    }
                .ds{
                    
                    display: none;
                }
                .picList{
                    display: flex;
                    padding: 20px 0;
                    width: 550px;
                    flex-wrap: wrap;
                    img{
                        width: 155px;
                        height: 155px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .time{
                    display: flex;
                    justify-content: space-between;
                    .time_num{
                        color: #bbbbbb;
                        font-size: 25px;
                        line-height: 30px;
                    }
                    .more{
                        width: 100px;
                        height: 50px;
                        background-color: #f8f8f6;
                        color: #3b5683;
                        line-height: 30px;
                        margin-top: -10px;
                        text-align: center;
                    }
                }
            }
        }
        .getmore{
        font-size: 35px;
        text-align: center;
        .van-loading{
            display: inline;
        }
    }
    }
}
</style>