<template>
<el-menu
  default-active="/"
  background-color="#002033"
  text-color="#fff"
  active-text-color="#ffd04b"
  class="aside-component"
  router
  :collapse="iscollapse"
  >

  <el-menu-item index="/">
    <i class="el-icon-menu"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-menu-item index="/article">
    <i class="el-icon-document"></i>
    <span slot="title">内容管理</span>
  </el-menu-item>
  <el-menu-item index="/image">
    <i class="el-icon-picture-outline-round"></i>
    <span slot="title">素材管理</span>
  </el-menu-item>
  <el-menu-item index="/publish">
    <i class="el-icon-s-promotion"></i>
    <span slot="title">发布文章</span>
  </el-menu-item>
  <el-menu-item index="/comment">
    <i class="el-icon-edit-outline"></i>
    <span slot="title">评论管理</span>
  </el-menu-item>
  <el-menu-item index="/fans">
    <i class="el-icon-collection-tag"></i>
    <span slot="title">粉丝管理</span>
  </el-menu-item>
  <el-menu-item index="/setting">
    <i class="el-icon-setting"></i>
    <span slot="title">个人设置</span>
  </el-menu-item>
</el-menu>
</template>

<script>
  export default {
    name: 'Aside',
    data () {
      return {
      }
    },
    methods: {
    },
    props:['iscollapse']
  }
</script>

<style scoped lang="less">
 .aside-component{
   height: 100%;
 }

</style>
