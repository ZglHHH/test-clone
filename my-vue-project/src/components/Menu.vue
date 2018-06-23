<template>
  <div>
   <div class="content">
     <ul v-show="!bad">
       <li class="title">炒菜类</li>
       <li v-for="item in menuList.menuList">
         <span class="name">{{item.name}}:</span>
         <span class="price">{{item.price}}</span>
       </li>
       <li class="title">特色小吃</li>
       <li v-for="item in menuList.smallFood">
         <span class="name">{{item.name}}:</span>
         <span class="price">{{item.price}}</span>
       </li>
       <li class="title">饮料</li>
       <li v-for="item in menuList.drinkList">
         <span class="name">{{item.name}}:</span>
         <span class="price">{{item.price}}</span>
       </li>
     </ul>
     <div class="pic-box">

     </div>
     <div v-show="bad" style="background: #fff;width: 100%;height:500px;position: absolute;top: 0px;">
        {{menuList}}
     </div>
   </div>

  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {
        menuList: '',
        bad:false
      }
    },
    computed:{
      shopId(){
        return this.$route.query
      }
    },
    watch:{
      'shopId'(){
        this.getMenuList();
      }
    },
    created(){
      this.getMenuList();
    },
    methods:{
      getMenuList(){
        console.log(this.shopId);
        this.$axios.post('/api/post/menu',{shopId:this.shopId.shopId})
          .then(res=>{
            console.log(res);
            if(typeof res.data == 'string'){
              this.menuList = res.data;
              this.bad = true
            }else{
              this.menuList = res.data;
              this.bad = false
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;padding: 0;border: 0;
  }
  .pic-box{
    width: 90%;
    margin: 0 auto;
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
  }
  a {
    color: #42b983;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 42px;
    left: 0px;
    background: #fff;
  }
  .title{
    width: 100%;
    font-weight: 600;
    box-sizing: border-box;
    padding-left:10px;
    padding-right:10px;
  }
  .name{
    display: inline-block;
    font-size: 12px;
    box-sizing: border-box;
    padding-left:20px;
    padding-right:20px;
    float: left;
  }
  .price{
    display: inline-block;
    font-size: 12px;
    box-sizing: border-box;
    padding-left:20px;
    padding-right:20px;
    float: right;
  }

</style>
