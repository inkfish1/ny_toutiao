<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 个人表单 -->
      <div>
        <el-row>
          <!-- 左边表单 -->
          <el-col :span="12">
            <div>
              <el-form ref="settingform" :model="form" :rules="rules" label-width="80px">
                 <el-form-item label="编号">
                   123
                 </el-form-item>
                 <el-form-item label="手机">
                   123ssss
                 </el-form-item>
                 <el-form-item label="媒体名称" prop="name">
                     <el-input v-model="form.name"></el-input>
                 </el-form-item>
                 <el-form-item label="媒体介绍" prop="desc">
                     <el-input type="textarea" v-model="form.desc"></el-input>
                 </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                     <el-input v-model="form.email"></el-input>
                 </el-form-item>
                 <el-form-item>
                   <el-button type="primary" @click="saveSetting">保存设置</el-button>
                 </el-form-item>
               </el-form>
            </div>
          </el-col>
          <!-- /左边表单 -->
          <!-- 右边头像 -->
          <el-col :span="12">
            <div>
              456
            </div>
          </el-col>
          <!-- /右边头像 -->
        </el-row>
      </div>
      <!-- /个人表单 -->
    </el-card>
  </div>
</template>

<script>
  export default{
    name: 'Setting',
    data () {
      return {
        form: {
          name: '',
          desc: '',
          email: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur'},
            { min:3, max: 20, message: '名称长度在3到20字符', trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        }
      }
    },

    methods:{
      saveSetting () {
        this.$refs['settingform'].validate((valid) => {
          if (!valid) {
            return
          }
        })
      }
    }

  }
</script>
<style>
</style>
