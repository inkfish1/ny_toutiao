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
      <el-form ref="settingform" :model="form" :rules="rules" label-width="80px">
        <div>
          <el-row>
            <!-- 左边表单 -->
            <el-col :span="12">
              <div>
                 <el-form-item label="编号">
                   {{form.id}}
                 </el-form-item>
                 <el-form-item label="手机">
                   {{form.mobile}}
                 </el-form-item>
                 <el-form-item label="媒体名称" prop="name">
                     <el-input v-model="form.name"></el-input>
                 </el-form-item>
                 <el-form-item label="媒体介绍" prop="desc">
                     <el-input type="textarea" v-model="form.intro"></el-input>
                 </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                     <el-input v-model="form.email"></el-input>
                 </el-form-item>
                 <el-form-item>
                   <el-button type="primary" @click="saveSetting">保存设置</el-button>
                 </el-form-item>
              </div>
            </el-col>
            <!-- /左边表单 -->
            <!-- 右边头像 -->
            <el-col :span="12">
              <div class="portrait">
                <!-- <img src="http://toutiao-img.itheima.net/Foaw-HLVwl1c9_A0Jt3np_1GU0vO" /> -->
                <el-image
                  :src="form.photo"
                  :preview-src-list="srcList"
                  class="portrait-img"
                >
                </el-image>
                <button @click="$refs.file.click()">修改头像</button>
                <input type="file" ref="file" hidden @change="onFileChange"/>
              </div>
              <el-dialog
                title="修改头像"
                :visible.sync="dialogVisible"
                append-to-body
                @opened="onDialogOpened">
                <div>
                  <img :src="previewimg" ref="preview-img" class="previewimg" />
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-col>
            <!-- /右边头像 -->
          </el-row>
        </div>
      </el-form>
      <!-- /个人表单 -->
    </el-card>
  </div>
</template>

<script>
  import { getUserInfo } from '@/api/user'
  import 'cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'
  export default{
    name: 'Setting',
    data () {
      return {
        form: {
          id:0,
          name: '',
          intro: '',
          email: '',
          mobile:'',
          photo:''
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
        },
        srcList: [],
        dialogVisible: false,
        previewimg:''
      }
    },

    methods: {
      saveSetting () {
        this.$refs['settingform'].validate((valid) => {
          if (!valid) {
            return
          }
        })
      },
      loadUser () {
        getUserInfo().then(res => {
          // console.log(res)
          this.form = res.data.data
          this.srcList.push(this.form.photo)
        })
      },
      onFileChange () {
        //弹出框
        const file = this.$refs.file.files[0]
        const blob = window.URL.createObjectURL(file)
        this.previewimg = blob
        this.dialogVisible = true
        
      },
      // 当dialog显示完成没有关闭时此时调用剪切头像组件
      onDialogOpened () {
        // const image = this.$refs['preview-img']
        // console.log(this.$refs['preview-img'])
        // const cropper = new Cropper(this.$refs['preview-img'],{
        //   aspectRatio: 6 / 9,
        //   crop(event){}
        // })
      }
    },

    created () {
      this.loadUser()
    }

  }
</script>
<style>
  .portrait {
    /* text-align: center; */
  }
  .portrait-img{
    height: 178px;
    width: 178px;
    margin: 20px 50%;
  }
  .portrait button{
    width: 110px;
    margin: 0px 50%;
    transform: translate(25%,0);
  }
  .previewimg{
    display: block;
    max-width: 100%;
    height: 200px;
  }
</style>
