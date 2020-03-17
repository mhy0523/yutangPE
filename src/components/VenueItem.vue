<template>
    <div class="venue">
            <div class="venue_item" @click="toDetail(venue.id)">
                <div class="venue_l"><img src="../img/ceshi.jpg"></div>
                <div class="venue_r">
                    <div class="vuenu_name">{{venue.name}}</div>
                    <div class="vuenu_type">{{venue.type_name}}</div>
                    <div class="vuenu_address">
                        <div class="vuenu_address_l">{{venue.address}}</div>
                        <div>0 Km</div>
                    </div>
                    <div class="vuenu_yuding">
                        <div class="vuenu_yuding_top">线上预定</div>
                        <div class="vuenu_yuding_bot">10元/小时起</div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props:['venue'],
    methods:{
        toDetail(id){
            this.$router.push({path:'/detail',query:{id}})
        }
    }
}
</script>
<style lang="less" scoped>
.venue{
    padding: 30px;
    box-sizing: border-box;

}
.venue_item{
    display: flex;
    border-bottom: 1px #e6e6e6 solid;
    .venue_l{
        width: 196px;
        height: 154px;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .venue_r{
        width: 100%;
        .vuenu_name{
            font-size: 30px;
        }
        .vuenu_type{
            font-size: 25px;
            color: #576163;
            line-height: 60px;
        }
        .vuenu_address{
            
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 25px;
            color: #576163;
            line-height: 60px;
            border-bottom: 1px #e6e6e6 solid;
            .vuenu_address_l{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 400px;
            }
        }
        .vuenu_yuding{
            line-height: 80px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .vuenu_yuding_top{
                font-size: 25px;
                color: #576163;
            }
            .vuenu_yuding_bot{
                font-size: 25px;
                color: #f0892d;
            }
        }
    }
}
</style>