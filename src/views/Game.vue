<template>
    <div class="game">
        <van-nav-bar
            title="活动"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="body">
            <dl v-for="game in gameList" :key="game.id" @click="gameDetail(game.id)" class="game">
                <dt class="game_title">{{game.title}}</dt>
                <dt class="game_type">{{game.type_name}}</dt>
                <dt class="creater">组织者：<img :src='game.user_icon ? game.user_icon : usericon' alt="">
                </dt>
                <dt class="game_time">发布时间：{{game.created_at}}</dt>
            </dl>
        </div>
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            gameList:[],
            usericon:require('@/img/ceshi.jpg')
        }
    },
    created(){
        this.getGame()
    },
    methods:{
        
        gameDetail(id){
            this.$router.push({
                path:'game_detail',
                query:{id}
            })
        },
        onClickLeft(){
            this.$router.back()
        },
        async getGame(){
            let { data:res } = await this.$http.get('game/list')
            this.gameList = res
            console.log(this.gameList);
            
        }
    },
}
</script>
<style lang="less">
    .game{
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
        padding: 30px;
        margin-top: 92px;
        margin-bottom:100px;
        .game{
            margin:0;
            margin-bottom: 20px;
            border-bottom: 1px #e6e6e6 solid;
            .game_title{
            font-size: 30px;
            line-height: 50px;
        }
            .game_type{
                display: inline-block;
                font-size: 25px;
                background-color: #ebb902;
                color: white;
                line-height: 50px;
                padding: 0 15px;
                border-radius: 15px;
            }
            .creater{
                font-size: 30px;
                color: #494949;
                position: relative;
                line-height: 50px;
                margin-top: 10px;

                img{width: 70px;
                    height: 70px;
                    position: absolute;
                    top: -15px;
                    border-radius: 50%;
                }
        }
        .game_time{
            font-size: 30px;
                color: #494949;
                position: relative;
                line-height: 50px;
        }
        }
        
        
    }
    }
</style>