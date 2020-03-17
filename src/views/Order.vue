<template>
    <div class="order">
        <van-nav-bar
            :title= name
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
            <div class="wrap">
            <van-tabs v-model="active" @click="change()">
                <van-tab v-for="item in priceList.datelist"  :key="item.date">
                    <div slot="title" class="title">
                        <div class="title_t">{{item.date | dateFormat}}</div>
                        <div class="title_b">{{item.week}}</div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="list">
                <div class="blue"></div>
                <div>选中的</div>
                <div class="white"></div>
                <div>可预订</div>
                <div class="border"></div>
                <div>不可选</div>
            </div>

            <div class="body">
                <ul class="times">
                    <li v-for="time in times" :key="time">{{time | timechange}}</li>
                </ul>
                <div class="price_wrap">
                    <template v-for="(sn_time_prices,date,index) in date_sn_time_prices">
                        <div :key="date" class="time_prices" v-show ="index == active">
                            <dl v-for=" (time_prices,sn) in sn_time_prices" :key="sn">
                                <dt class="sn">{{sn | snchange}}</dt>
                                <template  v-for="(prices,time) in time_prices ">
                                    <dd :key="time" class="price" @click="slect($event,time,sn,prices.price)" v-if="!prices.is_ordered">
                                        {{prices.price | pricechange}}
                                    </dd>
                                    <dd :key="time" class="ordered" v-else>
                                    </dd>
                                </template>
                            </dl>
                        </div>
                    </template>
                </div>    
            </div>  
            </div>
            <van-submit-bar
                :price="price"
                button-text="确认订单"
                @submit="pay"
                />

        
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            priceList:{},
            name:'',
            active:0,
            date_sn_time_prices:{},
            dateList:[],
            times:[],
            price:0,
            form:{
                items:[],
                venue_id:'',
                order_date:''
            }
        }
    },
    created(){
        let id = this.$route.query.id;
        this.form.venue_id = id;
        this.name = this.$route.query.name;
        this.active = this.$route.query.index;
        this.getTimePrices(id);
    },
    methods:{
        async pay(){
            this.form.order_date = this.dateList[this.active].date
            let { data:res } = await this.$http.post('/order/save',this.form)
        },
        change(){},
        slect(ev,time,sn,price){
            if(ev.target.className == 'price'){
                if(this.form.items.length === 4){
                return this.$toast('亲，单次最多可下单4场哦！')
            }
                ev.target.className = 'select'
                this.form.items.push({time:time,sn:sn})
                this.price += price*100

            }else{
                ev.target.className = 'price'
                this.form.items.map((item,index)=>{
                    if(item.time == time && item.sn == sn){
                        this.form.items.splice(index,1);
                    }
                })
                this.price -= price*100
            }
        },
        async getTimePrices(id){
         let { data:res } = await this.$http.get('venue/time_prices/'+id);
         this.priceList = res;
         this.dateList = res.datelist;
         this.times = res.times;
         this.date_sn_time_prices = res.dates;
     },
        onClickLeft(){
            this.$router.go(-1)
        },
    },
    filters:{
        timechange(time){
            return time + ':00'
        },
        pricechange(price){
            return '￥'+price
        },
        snchange(sn){
            return sn + '号场'
        },
			dateFormat(value){
				var arr = value.split("-"); // 2019-07-22   07~22		
				return arr[1]+"月"+arr[2]+"日";
			}
		}
}
</script>
<style lang="less">
.order{
    .wrap{
        margin-top: 92px;
    }
    dd {
    margin-inline-start: 0px!important;
}
    .van-tabs--line,.van-tabs__wrap{
    height: 80px!important;
}
    .van-tab{
        padding: 0!important;
    }
    .title{
        padding: 30px 0;
        border: 1px #f1f0f5 solid;
        .title_t{
        font-size: 30px;
        line-height: 50px;
    }
    .title_b{
        font-size: 25px;
        line-height: 50px;
        color: #a2a2a2;
    }
}
.list{
    padding: 40px 60px;
    font-size: 30px;
    display: flex;
    justify-content: space-around;
    .blue{
        width: 60px;
        height: 40px;
        background-color: #3399ee;
    }
    .white{
        width: 60px;
        height: 40px;
        border: 1px #e8e9eb solid;
    }
    .border{
        width: 60px;
        height: 40px;
        border: 1px #e8e9eb solid;
        background-color: #f8f8f8;
    }
}
.body{
    display: flex;
    margin-bottom: 100px;
    .times{
        font-size: 20px;
        color: #a3a3a3;
        line-height: 105px;
        margin: 0 30px;
    }
    .sn{
        line-height: 50px;
        text-align: center;
    }
    .price_wrap{
        margin-top: -40px;
        // display: flex;
        .time_prices{
            display: flex;
            font-size: 20px;
            color: #a3a3a3;
        }
        .price{
            width: 110px;
            height: 100px;
            background-color: #f8f8f8;
            border: 1px #f1f0f5 solid;
            line-height: 100px;
            text-align: center;
            font-size: 30px;
        }
        .ordered{
            width: 110px;
            height: 100px;
            background-color: #ddd;
            border: 1px #f1f0f5 solid;
            line-height: 100px;
            text-align: center;
            font-size: 30px;
        }
        .select{
            width: 110px;
            height: 100px;
            background-color: #3399ee;
            border: 1px #3399ee solid;
            color: white;
            line-height: 100px;
            text-align: center;
            font-size: 30px;
        }
    }
}
    .van-button--large{
        background-color: #3399ee;
        border:1px #3399ee solid;
    }
    .van-submit-bar__text{
        text-align: left;
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
}


</style>