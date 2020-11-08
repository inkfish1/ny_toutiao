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
        <el-button type="success" @click="dialogVisible = true">添加素材</el-button>
        <!-- 弹出框 -->
        <el-dialog title="上传素材" :visible.sync="dialogVisible" append-to-body="true">
          <el-upload
            class="upload-demo"
            drag
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadheaders"
            name="image"
            multiple
            :on-success="uploadSuccess"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-dialog>
        <!-- /弹出框 -->
      </div>
      <div class="img-show">
        <el-row v-loading="loading">
          <el-col
            :span="6"
            v-for="(item,index) in imagelists"
            :key="index"
            class="unit-item"
            >
            <el-image :src="item.url" class="img-op"></el-image>
            <!-- 透明收藏和删除 -->
            <div class="opcity-bar">
              <i :class="item.is_collected ? 'el-icon-star-off red-color' : 'el-icon-star-off white-color'"></i>
              <i class="el-icon-delete white-color" @click="deletImage(item.id)"></i>
            </div>
            <!-- /透明收藏和删除 -->
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
  import axios from 'axios'
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
        loading:true,
        dialogVisible: false,
        uploadheaders:{
           Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
        }
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
      },
      // 删除素材里的图片
      deletImage (id) {
        // console.log("123")
        // axios()
        // axios ({
        //   method: 'DELETE',
        //   url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images/'+id,
        //   headers: {
        //      Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
        //   }
        // }).then(res => {
        //   console.log('123')
        // })
      },
      // 上传素材成功
      uploadSuccess(){
        this.dialogVisible = false
        this.loadMaterial(this.currentpage, this.pagesize)
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
  .img-show .unit-item{
    position: relative;
  }
 .opcity-bar{
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top:175px;
    width: 200px;
    height: 25px;
    background-color: rgba(125,125,125,0.5);
  }
  .red-color{
    color: crimson;
    cursor: pointer;
  }
  .white-color{
    color: #FFFFFF;
    cursor: pointer;
  }
  .upload-demo{
    padding-left: 150px;
  }
</style>
