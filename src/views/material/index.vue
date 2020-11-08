<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 展示图片 -->
      <div class="action-bar">
        <el-radio-group
          v-model="collect"
          @change="selectChange"
          >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
         <el-button type="success">添加素材</el-button>
      </div>
      <div class="img-show">
        <el-row v-loading="loading">
          <el-col
            :span="6"
            v-for="(item,index) in imagelists"
            :key="index"
            >
            <el-image :src="item.url" class="img-op"></el-image>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-pagination
          background
          @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[12, 20, 32, 40]"
          :total="totalconut">
        </el-pagination>
      </div>
      <!-- /展示图片 -->
    </el-card>
  </div>
</template>

<script>
  import { getImage } from '@/api/image'
  export default {
    name: 'Material',
    data () {
      return {
        radio1: '全部',
        imagelists: [],
        collect: false,
        totalconut: null,
        currentpage: 1,
        pagesize: 12,
        loading:true
      }
    },

    methods: {
      loadMaterial () {
        this.loading = true
        getImage(this.currentpage, this.pagesize, this.collect).then(res => {
          // console.log(res)
          this.totalconut = res.data.data.total_count
          this.imagelists=res.data.data.results
          this.loading = false
        })
        
      },
      // 收藏和全部按钮更改触发事件
      selectChange () {
        this.loadMaterial()
      },
      // 每页数量改变时触发事件
      handleSizeChange (val) {
        this.pagesize=val
        this.loadMaterial(this.currentpage,val)
      },
      // 处理当前页的改变
      handleCurrentChange (val) {
        this.currentpage = val
        this.loadMaterial(val)
      }
    },

    created () {
      this.loadMaterial()
    }

  }
</script>

<style>
  .action-bar{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .img-show{
    margin-bottom: 20px;
  }
  .img-show .img-op{
    width: 200px;
    height: 200px;
    padding-bottom: 10px;
  }
</style>
