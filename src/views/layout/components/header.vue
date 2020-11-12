<template>
  <div class="header-container">
    <span>
      <i :class="{
        'el-icon-s-unfold':isCollapse,
        'el-icon-s-fold':!isCollapse
      }"
      @click="collapse">
      </i>
      后台管理
    </span>
    <el-dropdown>
      <span class="el-dropdown-link userinfo">
        <img :src="photo" />
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <!-- 自定义组件会出现不能调用原生事件，需要添加native -->
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { getUserInfo } from '@/api/user.js'
  // import axios from 'axios'
  import { EventBus } from '@/utils/globalbus.js'

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
          window.localStorage.setItem('Authorization',JSON.stringify(res.config.headers.Authorization))
        }).catch(err => {
          console.log("信息获取不到")
        })
      },

      // 向父组件传值控制侧边栏的收起
      collapse () {
        this.isCollapse=!this.isCollapse
        this.$emit('parentCollapse',this.isCollapse)
      },

      //自定义组件调用退出功能
      logout () {
        // 退出弹出框
        this.$confirm('此操作退出当前用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除localstorage
          window.localStorage.removeItem('message')
          // 跳转到登录页面
          this.$router.push('/login')
        })
      }

    },

    created () {
      this.loadUserInfo()
      EventBus.$on('person-photo',(data) => {
        this.photo = data
      })
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
