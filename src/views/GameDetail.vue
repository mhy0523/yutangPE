<template>
    <div class="gameDetail">
        <van-nav-bar
            title="活动详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="body">
            <div class="body_top">
                <div class="body_top1">
                    <div class="top1_1">{{name | typeName}}</div>
                    <div class="top1_2">{{game.datetime}}</div>
                </div>
                <div class="body_top2">
                    <div class="top2_1">{{game.venue_name}}</div>
                    <div class="top2_2"><van-icon name="location-o" /></div>
                </div>
                <div class="body_top3">
                    <div class="top3_1">费用：</div>
                    <div class="top3_2">40元/人</div>
                </div>
                <div class="body_top4">
                    <div class="top4_1">俱乐部：</div>
                    <div class="top4_2">{{game.venue_name}}</div>
                </div>
                <div class="body_top5">
                    <div class="top5_1">组织者：</div>
                    <div class="top5_2"><img :src='game.user_icon != "http://127.0.0.1/yutang_api/public/upload/" ? game.user_icon : usericon' alt=""></div>
                    <div class="lianxi">
                        <van-icon name="phone-o" />
                        <van-icon name="chat-o" class="duihua" />
                    </div>
                </div>
                <div class="body_top6">
                    <div>初级水平</div>
                    <div>中级水平</div>
                    <div>俱乐部活动</div>
                </div>
            </div>
            <div class="body_toper">报名用户：{{game.users_count}}/{{game.number}}</div>
        </div>
            <div class="body_main">
                <div class="shuoming">活动说明：</div>
                <div class="neirong">{{game.venue.des}}</div>
            </div> 
            <div class="body_footer">
                <div class="liuyanban">
                    <div>留言板</div>
                    <div><van-icon name="edit" />发表留言</div>
                    </div>
                <div class="neirong"><van-field
                    rows="5"
                    autosize
                    type="textarea"
                    placeholder="请输入留言"
                /></div>
            </div>  
        <div class="btnwrap"  v-if="game.is_join"><van-button type="info" @click="joinGame" class="btn" disabled  size="large" round >已加入活动</van-button></div>
        <div class="btnwrap"  v-else-if="game.is_full"><van-button type="info" class="btn" disabled  size="large" round >报名人数已满！</van-button></div>
        <div class="btnwrap"  v-else><van-button type="info" @click="joinGame" class="btn" size="large" round >加入活动</van-button></div>
        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            id:0,
            game:{
                venue:{
                    des:''
                }
            },
            token:'',
            name:"",
            usericon:require('@/img/ceshi.jpg')
        }
    },
    created(){
        this.id = this.$route.query.id
        this.getDetail()
    },
    methods:{
        
        async joinGame(){
            let { data:res } = await this.$http.get('/game/join/'+this.id)
            if(res.status != 200) return this.$toast('报名失败！')
            this.$toast('报名成功！')
            this.$router.push('my_game')
        },
        async getDetail(){
            let { data:res } = await this.$http.get('game/detail/'+this.id)
            if(res.status != 200) return this.$toast('数据请求失败！')

            this.game = res.data
            this.name = res.data.type.name
            console.log(this.game);
            
        },
        onClickLeft(){
            this.$router.back()
        },
    },
    filters:{
        typeName(value){
            return value.slice(0,1)
        },
    }
}
</script>
<style lang="less">
.gameDetail{
    .van-button--large{
        width: 90%;
        margin: 0 auto;
        margin-left: 18px;
    }
    background-color: #f5f4f9;
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
    .btnwrap{
        position: fixed;
        .btn{
        position:fixed;
        bottom: 0;
        left: 0;

    }
    }
    
    .body{
        background-color: white;
        margin-top: 113px;
        .body_top{
            p{
            margin: 0;
            }
            padding: 30px;
            padding-bottom: 50px;
            border-bottom: 1px #e6e6e6 solid;
            .body_top1{
                display: flex;
                .top1_1{
                    background-color: #ebb902;
                    padding: 0 10px;
                    color: white;
                    font-size: 20px;
                    line-height: 40px;
                    border-radius: 10px;
                    display: inline-block;
                }
                .top1_2{
                    margin-left: 20px;
                    font-size: 30px;
                }
            }
            .body_top2{
                display: flex;
                position: relative;
                display: inline-block;
                .top2_1{
                    font-size: 30px;
                    line-height: 80px;
                    margin-top: 10px;
                }
                .top2_2{
                    margin-left: 5px;
                    position: absolute;
                    top: 25px;
                    right: -60px;
                    color: #4b58e4;
                }
            }
            .body_top3{
                display: flex;
                    font-size: 30px;
                    line-height: 80px;
                .top3_1{
                    color: #595959;
                }
            }
            .body_top4{
                display: flex;
                    font-size: 30px;
                    line-height: 80px;
                .top4_1{
                    color: #595959;
                }
            }
            .body_top5{
                    display: flex;
                    font-size: 30px;
                    line-height: 80px;
                .top5_1{
                    color: #595959;
                }
                .top5_2{
                    width: 70px;
                    height: 70px;
                    img{
                        width: 70px;
                    height: 70px;
                    top: -15px;
                    border-radius: 50%;
                    }
                }
                div:last-child{
                    font-size: 40px;
                    margin-left: auto;
                    .duihua{
                        padding-left: 10px;
                        border-left: 1px solid #595959 ;
                    }
                }
            }
            .body_top6{
                display: flex;
                font-size: 18px;
                line-height: 40px;
                div{
                    padding: 0 16px;
                    margin-right: 15px;
                    border: 2px solid #6a5ef2 ;
                    border-radius: 25px;
                    color: #6a5ef2;
                }
                div:last-child{
                    border: 2px solid #0da43b ;
                    color: #0da43b;
                }
            }
        }
        .body_toper{
            padding: 30px;
            font-size: 30px;
            color: #595959;
            line-height: 50px;
        }
        
    }
    .body_main{
        margin: 15px 0;
        background-color: white;
        padding: 30px;
        .shuoming{
            font-size: 30px;
            line-height: 50px;
        }
        .neirong{
            font-size: 25px;
            line-height: 45px;
            color: #595959;
        }
    }
    .body_footer{
        background-color: white;
        padding: 30px;
        font-size: 30px;
        .liuyanban{
            display: flex;
            justify-content: space-between;
        }
    }
}

</style>