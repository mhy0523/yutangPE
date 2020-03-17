<template>
    <div class="create_msg">
        <van-nav-bar left-text="取消" right-text="发表"  @click-left="topengyouquan"  @click-right="saveFriendMag">
        </van-nav-bar>

        <div class="body">
             <van-cell-group>
                <van-field
                    maxlength=200
                    class="textarea"
                    v-model="message"
                    rows="4"
                    autosize
                    type="textarea"
                    placeholder="这一刻的想法..."
                />
                <van-uploader v-model="fileList" multiple class="fileList" :after-read="afterRead" :max-count='9' preview-size="107px"/>
                </van-cell-group>
                <van-cell title="所在位置" is-link  icon="location-o"/>
                <van-cell title="提醒谁看" is-link  icon="like-o"/>
                <van-cell title="谁可以看" is-link  icon="user-o"/>
        </div>
    </div>
</template>
<script>
export default {                                               
    data(){
        return{
            message:'',
            fileList:[],
            formData:new FormData()
        }
    },
    created(){
    },
    methods:{
        topengyouquan(){
            this.$router.push('/find')
        },
        afterRead(field){
            if(field.constructor == Object){
                this.formData.append('myfile[]',field.file)
            }else{
                field.map(item=>{
                this.formData.append('myfile[]',item.file)
            })
            }
            
        },
        async saveFriendMag(){
            //准备数据结构 发起请求
            this.formData.append('message',this.message)
            let { data:res } = await this.$http.post('user/send_friend_msg',this.formData)
            console.log(res);
            if(res.status !=200 ) return this.$toast.fail('发布失败！')
            this.$toast.success('发布成功！')
            this.$router.push('find')
        }
    }
}
</script>
<style lang="less">
.create_msg{
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
        margin-top: 92px;
        padding: 0 30px;
        .fileList{
            padding-bottom: 50px;
            margin-top: 30px;
        }
    }
}
</style>