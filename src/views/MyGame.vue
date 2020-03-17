<template>
    <div class="myName">
        <van-nav-bar
            title="我的活动"
            left-text="返回"
            right-text="发布活动"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            />
        <van-tabs v-model="active" class="game">
            <van-tab title="我的参与">
                <dl class="game_dl" v-for="jGame in joinGame" :key="jGame.id" @click="todetail(jGame.id)">
                    <dt class="game_time">{{jGame.datetime | datetime}}</dt>
                    <dt class="game_title"><div class="title">{{jGame.datetime | shiduan}}</div><div class="type">{{jGame.type_id | type}}</div><div class="venue">{{jGame.title}}</div></dt>
                    <dt class="game_org">组织者：<img :src="usericon" alt=""></dt>
                </dl>
            </van-tab>
            <van-tab title="我的发布">
                <dl class="game_dl" v-for="cGame in createGame" :key="cGame.id" @click="todetail(cGame.id)">
                    <dt class="game_time">{{cGame.datetime | datetime}}</dt>
                    <dt class="game_title"><div class="title">{{cGame.datetime | shiduan}}</div><div class="type">{{cGame.type_id | type}}</div><div class="venue">{{cGame.title}}</div></dt>
                    <dt class="game_org">组织者：<img :src="usericon" alt=""></dt>
                </dl>
            </van-tab>
        </van-tabs>
        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            active:0,
            createGame:[],
            joinGame:[],
            usericon:require('@/img/ceshi.jpg')
        }
    },
    created(){
        this.getCreatedGame()
        this.getJoinGame()
    },
    methods:{
        todetail(id){
            this.$router.push({
                path:'game_detail',
                query:{id}
            })
        },
        async getJoinGame(){
            let { data:res } = await this.$http.get('user/my_join_games')
            this.joinGame = res.data.data
            
        },
        async getCreatedGame(){
            let { data:res } = await this.$http.get('user/my_create_games')
            this.createGame = res.data.data
            console.log(this.createGame);
            
        },
        onClickLeft(){
            this.$router.back()
        },
        onClickRight(){
            this.$router.push('/add_active')
        },
    },
    filters:{
        type(value){
            let arr=['','羽','乒','篮','足','网','高','台','保']
            return arr[value]
        },
        typeName(value){
            return value.slice(0,1)
        },
        datetime(value){
            let arr=value.split(' ')[0].split('-')
            return '— '+arr[1]+'月'+arr[2]+'日'+' —'
            
        },
        shiduan(value){
            let arr=value.split(' ')[1].split(':')[0]
            if(arr>=4 && arr<8){
                return '早上'
                }else if(arr>=8 && arr<12){
                    return '上午'
                }else if(arr>=12 && arr<18){
                    return '下午'
                }else{
                    return '晚上'
                }
            
        },
    }
}
</script>
<style lang="less" scoped>
.myName{
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
    .game{
        margin-top: 92px;
        background-color: #f5f5f9;
        .game_dl{
            background-color: white;
            margin: 0;
            margin-top: 20px;
            .game_time{
            height: 90px;
            line-height: 90px;
            text-align: center;
            color: #616161;
            font-size: 20px;
            border-bottom: 1px #e1e1e1 solid;
            margin: 0;
            }
            .game_title{
                display: flex;
                padding: 30px;
                font-size: 35px;
                .title{
                    color: #ff0101;

                }
                .type{
                    background-color: #ebb902;
                    padding: 0 10px;
                    color: white;
                    font-size: 20px;
                    line-height: 44px;
                    border-radius: 10px;
                    display: inline-block;
                    margin-left: 25px;
                }
                .venue{
                    margin-left: 25px;
                }
            }
            .game_org{
                overflow: hidden;
                font-size: 30px;
                padding: 10px 30px;
                position: relative;
                height: 90px;
                img{
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    position: absolute;
                    top: -16px;
                }
            }
            
        }
        
    }
}
</style>