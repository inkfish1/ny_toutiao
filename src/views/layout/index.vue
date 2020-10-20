<template>
  <el-container class="layout-index">
    <el-aside  class="aside" width="auto" >
      <!-- 父组件向子组件传值 -->
      <Aside :iscollapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 子组件向父组件传值 -->
        <header-component @parentCollapse='getcollapse'/>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from './components/aside.vue'
  import HeaderComponent from './components/header.vue'
  export default{
    name: 'LayouIndex',
    data () {
      return {
         isCollapse:false
      }
    },
    methods: {
      getcollapse(msg){
        this.isCollapse=msg
      }
    },
    components: {
      Aside,
      HeaderComponent
    }
  }
</script>

<style scoped lang="less">
.layout-index{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.aside{
  background-color: #d3dce6;
}
.header{
  background-color: #b3c0d1;
}
.main{
  background-color: #e9eef3;
}
</style>
