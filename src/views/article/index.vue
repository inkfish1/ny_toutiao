<template>
  <div id="article-container">
    <!-- 内容管理 -->
    <el-card class="box-card">
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
        <el-form  :model="ruleForm"  label-width="100px" class="demo-ruleForm">
          <el-form-item label="全部:" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio  label="全部"></el-radio>
              <el-radio  label="草稿"></el-radio>
              <el-radio  label="待审核"></el-radio>
              <el-radio  label="审核通过"></el-radio>
              <el-radio  label="审核失败"></el-radio>
              <el-radio  label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /筛选条件 -->
    </el-card>
    <!-- /内容管理 -->
  </div>
</template>

<script>
  export default{
    name: 'Article',
    data () {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '全部',
          desc: ''
        },
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
</style>
