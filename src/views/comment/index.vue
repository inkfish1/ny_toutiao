<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 评论表格 -->
      <div class="comment-table">
         <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数">
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数据">
          </el-table-column>
          <el-table-column
            label="评论状态">
            <template slot-scope="scope">
              {{scope.row.comment_status ? '已开启' : '已关闭'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
             <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.comment_status ? 'danger' : 'success'"
                @click="handleComment(scope.row)"
                >{{scope.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- /评论表格 -->
      <el-pagination
        background
        :page-size="10"
        :pager-count="11"
        layout="prev, pager, next"
        :total="totalcount"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { getArticleLists } from '@/api/article'
  import { handleComment } from '@/api/comment'
  export default {
    name: 'Comment',
    data () {
      return {
        tableData: [],
        totalcount:0
      }
    },

    methods: {
      // 获取评论列表
      loadComment () {
        const Authorization = JSON.parse(window.localStorage.getItem('Authorization'))
        // 将信息传递到axios请求
        getArticleLists(Authorization, 1, null, null, null, 'comment').then(res => {
          console.log(res)
          this.totalcount = res.data.data.total_count
          this.tableData = res.data.data.results
        }).catch(err => {
          console.log('失败')
        })
      },
      // 处理评论的关闭和打开
      handleComment (item) {
        // 弹出框询问是否开启评论
        this.$confirm(item.comment_status ? '此操作将关闭评论, 是否继续?' : '此操作将开启评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          item.comment_status = !item.comment_status
          handleComment(item.id, item.comment_status)
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          })
        })
      },
      // 分页,页码变化时
      handleCurrentChange (val) {
        console.log(val)
      }
    },

    created () {
      this.loadComment()
    }
  }
</script>

<style>
  .comment-table{
    margin-bottom: 30px;
  }
</style>
