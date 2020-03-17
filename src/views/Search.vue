<template>
    <div>
        <form action="/">
            <van-search
                ref="Inp"
                v-model="words"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
                @cancel="onCancel"
               
            />
            </form>
            <div class="body">
                <template v-for="item in resList">
                    <VenueItem :key="item.id" :venue='item'></VenueItem>
                </template>
            </div>
            <div class="more" v-if="!isFinish" @click="getMore">加载更多<van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" /></div>
    </div>
</template>
<script>
import VenueItem from '../components/VenueItem'
export default {
    data(){
        return {
            words:'',
            resList:[],
            page:1,
            isFinish:true,
            isLoading:false,
        }
    },
    created(){
        this.scroll()
    },
    components:{
        VenueItem
    },
    mounted(){
            this.$refs.Inp.getElementsByTagName('input')[0].focus()
  },
    methods:{
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
        async onSearch(){
            this.isFinish = false;
            this.isLoading = true;
            let { data:res } = await this.$http.post('venue/search',{
                words:this.words,page:this.page
            })
            this.resList = this.resList.concat(res.data);
            this.isLoading = false;
            if(res.last_page == this.page) this.isFinish = true
            console.log(this.resList);
            
        },
        getMore(){
            
            if(this.isLoading == true || this.isFinish == true) return false ;
            this.page ++;
            this.onSearch()
        },
        onCancel(){
            this.$router.go(-1)
        }
    },
    beforeDestroy(){
        window.onscroll = null;
    }
    
}
</script>
<style lang="less" scoped>
.more{
        font-size: 35px;
        text-align: center;
        .van-loading{
            display: inline;
        }
    }

</style>