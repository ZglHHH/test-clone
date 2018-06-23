<template>
  <div>
    <div class="header">
      <div class="back" @click="backPage" v-show="shopInfo"></div>
      <p class="index">首页</p>
      <div class="space" v-show="shopInfo"></div>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in shopList.shopList" @click="goPage(item.shopId)">{{item.name}}</li>
      </ul>
    </div>
    <router-view></router-view>
    <div class="file-box">
      <div>
        <input type="file" @change="upload($event)">
        <img :src="imageUrl">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                shopList: '',
                shopInfo: false,
                imageUrl:''
            }
        },
        created(){
            this.getShopList();
        },
        methods:{
            getShopList(){
                this.$axios.get('/api/get/shop')
                    .then(res=>{
                        console.log(res);
                        this.shopList = res.data
                    })
            },
            goPage(id){
                this.shopInfo = true;
                this.$router.push('/menu?shopId='+id)
            },
            upload(e) {
                var self = this;
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    let param = new FormData(); // 创建form对象
                    param.append('file', file, file.name);
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    };
                    // 添加请求头
                    self.$axios.post('/api/post/image', param, config)
                        .then(response => {
                            console.log(response)
                            self.imageUrl = response.data.url
                          console.log(self.imageUrl)
                        })
                }
            },
            backPage(){
                this.shopInfo = false;
                this.$router.push('/')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;padding: 0;border: 0;
  }
  .header{
    height: 42px;
    width: 100%;
    text-align: center;
    line-height: 42px;
    font-size:16px;
    background: #0a78ff;
    color: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
  }
  .back{
    flex-grow: 1;
    background: url("../assets/icon-back.png") no-repeat center center;
    background-size: 75%;
  }
  .index{
    flex-grow: 8;
  }
  .space{
    flex-grow: 1;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    width: 100%;
    height:30px;
    font-size:14px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    background: url("../assets/next.png") no-repeat right center;
    background-size:5%;
  }
  a {
    color: #42b983;
  }
  .content{
    width: 100%;
    background: #fff;
    margin-top: 42px;
  }
  .file-box{
    width: 94%;
    margin: 0 auto;
    height: 148px;
  }
  .file-box div{
    margin-top: 10px;
    width: 32px;
    height: 32px;
    border: 1px dashed #ccc;
    background: url("../assets/add.png") no-repeat center center;
    background-size: cover;
  }
  .file-box input{
    display: inline-block;
    width: 32px;
    height: 32px;
    z-index: 2;
    opacity: 0;
  }
  .file-box img{
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
    top: -33px;
    left: -1px;
  }
  img[src='']{
    visibility: hidden;
  }
</style>
