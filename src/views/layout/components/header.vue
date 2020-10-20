<template>
  <div class="header-container">
    <span>
      <i :class="{
        'el-icon-s-unfold':isCollapse,
        'el-icon-s-fold':!isCollapse
      }"
      @click="collapse">
      </i>
      江苏传智播客科技教育有限公司
    </span>
    <el-dropdown>
      <span class="el-dropdown-link userinfo">
        <img :src="photo" />
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { getUserInfo } from '@/api/user.js'
  import axios from 'axios'
  export default{
    name: 'HeaderComponent',
    data () {
      return {
        name:'',
        photo:'',
        isCollapse:false
      }
    },
    methods: {
      loadUserInfo () {
        getUserInfo().then(res => {
          this.name = res.data.data.name
          this.photo = res.data.data.photo
        }).catch(err => {
          console.log("信息获取不到")
        })
      },

      // 向父组件传值控制侧边栏的收起
      collapse () {
        this.isCollapse=!this.isCollapse
        this.$emit('parentCollapse',this.isCollapse)

      }


    },
    created () {
      this.loadUserInfo()
    }
  }
</script>

<style scoped lang="less">
  .header-container{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userinfo{
    display: flex;
    align-items: center;
  }
  .userinfo img{
    height: 30px;
    width: 30px;
    margin-right: 20px;
    border-radius: 50%;
    border: 1px solid gray;
  }
</style>
