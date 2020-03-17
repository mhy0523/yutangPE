<template>
    <div class="myName">
        <van-nav-bar
            title="发布活动"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
            <div class="body">
                <van-cell-group>
                    <van-field
                    v-model="game.title"
                    label="活动标题"
                    placeholder="请输入活动标题"
                    />

                    <van-cell title="活动项目" is-link :value="typeName" @click="showTypeList" />
                    <van-cell title="活动场馆" is-link :value="name|elipsis" @click="selectVenue" />
                    <van-cell title="活动时间" is-link :value="game.datetime" @click="showDateList" />
                    <van-cell title="活动人数" >
                        <van-stepper v-model="game.number" slot="right-icon"/>
                    </van-cell>
                    
                    <van-field
                        v-model="game.des"
                        rows="1"
                        autosize
                        label="活动介绍"
                        type="textarea"
                        placeholder="请输入活动介绍"
                    />
                    
                </van-cell-group> 
                <div class="btnList">
                    <van-button type="info" @click="saveGame">创建活动</van-button>
                    <van-button plain type="info">重置信息</van-button>
                </div>
                <van-popup v-model="dateShow" position="bottom">
                    <van-datetime-picker
                        v-model="currentDate"
                        type="datetime"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="cancel"
                        @confirm="confirm"
                        />
                </van-popup> 

    </div>

    <van-action-sheet v-model="show" :actions="typeList" @select="onSelect" />
        
    </div>
</template>
<script>
export default {
    name:'addActive',                                               
    data(){
        return{
            game:{
                title:"",
                des:'',
                number:1,
                datetime:'选择日期',
                venue_id:0,
                type_id:0
            },
            typeName:'请选择类型',
            show:false,
            typeList:[],
            dateShow:false,
            minDate: new Date(),
            maxDate: new Date(2022, 11, 13),
            currentDate: new Date(),
            isType:false,
            name:'请选择场馆'
        }
    },
     // 组件的路由钩子函数
    beforeRouteEnter(to,from,next){

       if(from.name=="select_venue"){
           next(vm=>{
               if(vm.$route.params.item){
                let venue =  vm.$route.params.item;   
                vm.name = venue.name
                vm.game.venue_id = venue.id;
               }
           });                            
       }else{
           next();
       }
       
    },
    created(){
        this.getTypeList();
        
    },
    methods:{
        async saveGame(){
            let { data:res } = await this.$http.post('game/save',this.game)
            if(res.code == !200) return this.$toast('活动创建失败！')
            this.$toast('活动创建成功！')
            this.$router.push('my_game')
        },
        selectVenue(){

            if(this.isType){
                    this.$router.push({
                    path:'/select_venue',
                    query:{type_id:this.game.type_id}
                })
            }else{
                this.$toast('请选择活动项目后选择此项。')
            }
            
        },
        confirm(d){
            this.game.datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+" "+d.getHours()+':'+d.getMinutes()
            this.dateShow = false
        },
        cancel(){
            this.dateShow = false
        },
        showDateList(){
            this.dateShow = true;
        },
        onClickLeft(){
            this.$router.back()
        },
        async getTypeList(){
            let { data:res } = await this.$http.get('venue/types');
             this.typeList = res;
        },
        onSelect(item,index){
            this.typeName = item.name
            this.show = false
            this.game.type_id = item.id
            if(this.game.type_id != 0) return this.isType = true
        },
        showTypeList(){
           this.show = true;
           this.name = '请选择场馆';
        }
        
    },
    filters:{
        elipsis(value){
            if(!value) return ""
            if(value.length>15) {
                return value.slice(0,15)+"..." 
                }
                return value
        }
    }
}
</script>
<style lang="less" scoped>
.myName{
    .body{
        margin-top: 92px;
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
    .btnList{
        float: right;
        margin-top: 100px;
        margin-bottom: 50px;
        .van-button{
            margin-right: 20px;
        }
    }
}
</style>