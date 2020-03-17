<template>
    <div class="wrap">
        <div class="heder"><van-search placeholder="请输入搜索关键词" @focus="OnSearch" />
        <van-dropdown-menu>
            <van-dropdown-item v-model="type" :options="typeList" @change="onChange"/>
            <van-dropdown-item v-model="order" :options="orderList" />
        </van-dropdown-menu>
        </div>
        
        
        <div class="venulist">
            <template v-for="item in venueList">
            <VenueItem :key="item.id" :venue='item'></VenueItem>
            </template>
        </div>

        <div class="more" v-if="!isFinish" @click="getMore">加载更多<van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" /></div>
        
    </div>
</template>
<script>
import VenueItem from '../components/VenueItem'
export default { 
    name:'venue',                                              
    data(){
        return{
            venueList:[],
            page:1,
            isLoading:false,
            isFinish:false,
            type:0,
            order:0,
            typeList:[{text:"全部类型",value:0}],
            orderList:[{text:"距离",value:0},{text:"价格",value:1},{text:"热度",value:2}]
        }
    },
    components:{
        VenueItem
    },
    created(){
        this.getVenueList()
        this.scroll()
        this.getTypeList()
    },
    methods:{
        onChange(){
            this.isFinish = false;
            this.venueList = []
            this.page = 1
            this.getVenueList()
        },
        async getTypeList(){
            let { data:res } = await this.$http.get('venue/types');
            res.map((item)=>{
                let type = {}
                type.text = item.name
                type.value = item.id
                this.typeList.push(type)
            })
            
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
    
        async getVenueList(){
            this.isLoading = true;
            let { data:res } = await this.$http.get('venue/list?page='+this.page,{
                params:{ type_id:this.type}
            });
            this.venueList = this.venueList.concat(res.data)
            this.isLoading = false;
            if(res.last_page == this.page) this.isFinish = true
            
        },
        getMore(){
            
            if(this.isLoading == true || this.isFinish == true) return false ;
            this.page ++;
            this.getVenueList()
        },
        OnSearch(){
            this.$router.push('/search')
        }
    }
}
</script>
<style lang="less" scoped>
.wrap{
    .heder{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        left: 0;
    }
    .venulist{
        margin-top: 208px;
    }
    margin-bottom: 100px;
    .more{
        font-size: 35px;
        text-align: center;
        .van-loading{
            display: inline;
        }
    }
}

</style>