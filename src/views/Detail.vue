<template>
    <div class="detail">
        <van-nav-bar
            :title= detail.name
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="top">
            <div class="top_1">
            <div class="top_l"><img src="../img/ceshi.jpg" alt=""></div>
            <div class="top_r">
                <div class="top_r_name">{{detail.name}}</div>
                <div class="top_r_address">{{detail.address}}</div>
                <div class="top_r_time">营业时间：09:00~22:00</div>
            </div>
            <div class="top_icon"><van-icon name="location-o" /></div>
            </div> 
            <div class="top_phone">
                <div>{{detail.phone}}</div>
                <van-icon name="phone-o"  class="top_phone_r"/>
            </div> 

        </div>

        <div class="date">
            <div class="date_t">羽毛球</div>
            <div class="date_wrap">
                <div class="date_long">
                    <div class="date_item" v-for="(item,index) in detail.dates" :key="index" @click="order(index)">
                        <div class="date_week">{{item.week}}</div>
                        <div class="date_date">{{item.date | dateFormat}}</div>
                        <div class="date_chongzu">充足</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sheshi">
            <div class="sheshi_title">场馆设施
                <div><van-icon name="logistics" class="sheshi_title_icon"/><div>停车位</div></div>
            </div>
                
        </div>

        <div class="btn_list">
            <div class="jiaotong"><div>交通方式</div><div>></div></div>
            <div class="jieshao"><div>场馆介绍</div><div>></div></div>
        </div>
        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            detail:{},
        }
    },
    created(){
        let id = this.$route.query.id;
        this.getDetail(id)
    },
    methods:{
        order(index){
            this.$router.push({
                path:'/order',
                query:{id:this.detail.id,name:this.detail.name,index}
            })
        },
        async getDetail(id){
            let { data:res } = await this.$http.get("venue/detail/"+id)
            this.detail = res;
            console.log(this.detail);
        },
            onClickLeft(){
                this.$router.go(-1)
            },
    
    },
    filters:{
			dateFormat(value){
				var arr = value.split("-"); // 2019-07-22   07~22		
				return arr[1]+"~"+arr[2];
			}
		}
}
</script>
<style lang="less" scoped>

.detail{
    background-color: #f8f8f8;
    margin-bottom: 50px;
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
}
.top{
    padding: 30px;
    padding-bottom: 0px;
    background-color: white;
    border-bottom: 1px #e6e6e6 solid;
    margin-top: 92px;
    .top_l{
        width: 196px;
        height: 154px;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .top_1{
        border-bottom: 1px #e6e6e6 solid;
        display: flex;
        padding-bottom: 30px;

    }
    .top_r{
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        .top_r_name{
            font-size: 35px;
        }
        .top_r_address,.top_r_time{
            font-size: 24px;
            line-height: 35px;
            color: #747474;
            margin-top: 20px;
        }
    }
    .top_icon{
        margin-left: 30px;
        margin-top: 50px;
        color: #2088e9;
    }
    .top_phone{
        display: flex;
        justify-content: space-between;
        font-size: 35px;
        line-height: 110px;
        .top_phone_r{
            margin-top: 30px;
            color: #2088e9;
            font-size: 50px;
        }
    }
}

.sheshi{
    padding: 30px;
    background-color: white;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-top: 1px #e6e6e6 solid;
    border-bottom: 1px #e6e6e6 solid;
    .sheshi_title{
        font-size: 30px;
        line-height: 80px;
        .sheshi_title_icon{
            font-size: 50px;
            color: #d4d4d4;
            margin-left: 20px;
        }
    }
}
.btn_list{
    background-color: white;
    border-top: 1px #e6e6e6 solid;
    padding: 30px;
    padding-top: 0px;
    .jiaotong,.jieshao{
        border-bottom: 1px #e6e6e6 solid;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        line-height: 110px;
    }
}

.date{
    background-color: white;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border-top: 1px #e6e6e6 solid;
    padding-top:30px;
    .date_t{
        color: #2d93e7;
        line-height: 80px;
        font-size: 30px;
        padding-left: 30px;
    }
    .date_wrap{
        background-color: #f8f8f8;
        width: 100vw;
        overflow: scroll;
        .date_long{
            padding: 25px;
            display: flex;
            .date_item{
                margin: 0 10px;
                background-color: white;
                border: 1px #e6e6e6 solid;
                padding: 30px;
                display: flex;
                flex-direction: column;
                text-align: center;
                .date_week{
                    font-size: 25px;
                    line-height: 50px;
                    width: 180px;
                }
                .date_date{
                    font-size: 25px;
                    line-height: 50px;
                    width: 180px;
                }
                .date_chongzu{
                    font-size: 25px;
                    line-height: 50px;
                    color: #8bba48;
                    width: 180px;
                }
            }
        }
    }
}
</style>