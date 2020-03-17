<template>
    <div class="selectVenue">
        <van-nav-bar
            title="选择场地"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @select="select"
            />
    </div>
</template>
<script>
export default {
    name:'selectVenue',                                               
    data(){
        return{
            chosenAddressId: '',
            type_id:0,
            list:[]
        }
    },
    created(){
        this.type_id = this.$route.query.type_id
        this.getVenueList()
    },
    methods:{
        
        async getVenueList(){
            let { data:res } = await this.$http.get('venue/list',{
                params:{type_id:this.type_id}
            })
            this.list = res.data
            this.chosenAddressId = this.list[0].id
            console.log(this.list);
            
        },
        onClickLeft(){
            this.$router.back()
        },
        select(item,index){
            this.$router.push({
                name:'add_active',
                params:{item}
            })
        }
    }
}
</script>
<style lang="less" scoped>
.selectVenue{
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
}
</style>