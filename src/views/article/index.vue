<template>
  <div id="article-container">
    <!-- 内容管理 -->
    <el-card class="box-card filter-card">
      <div slot="header" class="clearfix">
        <span>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- /面包屑导航 -->
        </span>
      </div>
      <!-- 筛选条件 -->
      <div>
        <el-form  :model="screeningForm"  label-width="100px" class="demo-ruleForm">
          <el-form-item label="状态:">
            <el-radio-group v-model="screeningForm.type">
              <el-radio  label="全部"></el-radio>
              <el-radio  label="草稿"></el-radio>
              <el-radio  label="待审核"></el-radio>
              <el-radio  label="审核通过"></el-radio>
              <el-radio  label="审核失败"></el-radio>
              <el-radio  label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道:"  >
            <el-select v-model="screeningForm.channel" placeholder="请选择活动区域" clearable>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
              v-model="screeningForm.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /筛选条件 -->
    </el-card>
    <!-- /内容管理 -->

    <!-- 筛选的结果展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{ totalcount }}条结果：</span>
      </div>
      <div>
        <!-- table表格组件，注意不需要去v-for遍历，它自己会遍历 -->
        <el-table
          :data="articllists"
          stripe
          style="width: 100%">
          <el-table-column
            prop=""
            label="封面">
            <template slot-scope="scope">
              <img
              class="article-image"
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
               />
               <img
               class="article-image"
               v-else
               src="./replace.gif"
                />
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="review[scope.row.status].type">
              {{ review[scope.row.status].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" icon="el-icon-edit" plain circle></el-button>
                <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="pagination"
      @current-change="handleCurrentChange"
      >
      </el-pagination>
      <!-- /分页 -->
    </el-card>
    <!-- /筛选的结果展示 -->

  </div>
</template>

<script>
  // import axios from 'axios'
  import { getArticleLists } from '@/api/article.js'
  export default{
    name: 'Article',
    data () {
      return {
        screeningForm: {
          type:'全部',
          channel:'',
          date:''
        },
        // 用于筛选后的变量
        articllists: [],
        totalcount:0,
        review: [
          { status: 0, text: '草稿', type: 'info' },
          { status: 1, text: '待审核', type: '' },
          { status: 2, text: '审核通过', type: 'success' },
          { status: 3, text: '审核失败', type: 'warning' },
          { status: 4, text: '已删除', type: 'danger' },
        ]
      }

    },
    methods: {
      loadArticles () {
        // 获取保存在localstorage中header头里的验证信息
        const Authorization = JSON.parse(window.localStorage.getItem('Authorization'))
        // 将信息传递到axios请求
        getArticleLists(Authorization).then(res => {
          this.totalcount=res.data.data.total_count
          this.articllists = res.data.data.results
        }).catch(err => {
          console.log('失败')
        })
      },
      handleCurrentChange(val){
        console.log(val);
      }

    },
    created () {
      this.loadArticles()
    }
  }
</script>

<style scoped lang="less">
  .filter-card{
    margin-bottom: 30px;
  }
  .lists-card{
    margin-bottom: 20px;
  }
  .pagination{
    margin-top: 15px;
    text-align: center;
  }
  .article-image{
    width: 150px;
    height: 100px;
  }
</style>
