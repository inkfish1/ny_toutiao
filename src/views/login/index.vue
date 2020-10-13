<template>
  <div class="login-container">
    <div class="log-form-wrap">
       <img src="./logo_index.png" />
       <el-form ref="login_auth" :model="user" :rules="rules" >
           <el-form-item  prop="mobile">
             <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
           </el-form-item>
           <el-form-item prop="password">
             <el-input v-model="user.password" placeholder="请输入密码"></el-input>
           </el-form-item>
           <el-form-item prop="agree">
              <el-checkbox v-model="user.agree" >我已阅读并同意用户协议和隐私条款</el-checkbox>
           </el-form-item>
           <el-form-item>
           <el-button type="primary" :loading="loginLoading" @click="onLogin" class="login-btn">登录</el-button>
           </el-form-item>
       </el-form>
    </div>
  </div>
</template>

<script>
  // import request from '@/utils/request'
  import { login } from '@/api/user'
  export default{
    name:'LoginIndex',
    components:{},
    props:{},
    data(){
      return {
        user: {
           mobile:'',
           password:'',
           agree:false
           },
        rules:{
          mobile:[
            {required:true,message:'请输入手机号',trigger:'change'},
            // 正则表达式验证
            {pattern: /^1[3|5|7]\d{9}$/,message:'请输入正确的号码格式',trigger:'blur'}
            ],
          password:[
             {required:true,message:'请输入密码',trigger:'change'},
             {pattern: /^\d{6}$/,message:'请输入6位密码格式',trigger:'blur'}
          ],
          // 自定义验证
          agree:[
           {
             validator:(rule,value,callback) => {
               if(value){
                 callback()
               }else{
                 callback(new Error('请勾选协议'))
               }
             },
             trigger:'change'
           }
          ]

        },
        loginLoading:false
      }
    },
    computed:{},
    watch:{},
    created () {},
    mounted () {},
    methods:{
      login() {
        // 3.验证通过，提交登录
        //按钮处在加载状态
        this.loginLoading = true
        login().then(res => {
          // 显示弹出框
          this.$message({
            showClose:true,
            message:'登录成功',
            type:'success'
          })
          // 恢复按钮正常状态
          this.loginLoading=false
        }).catch(err => {
          this.$message({
            showClose: true,
            message: '登录失败，请检查账号和密码',
            type: 'error'
          })
          // 恢复按钮正常状态
          this.loginLoading=false
        })
      },

      onLogin() {
              // 1.获取表单
              const user = this.user
              // 2.表单验证
              this.$refs['login_auth'].validate((valid) => {
                if(!valid){
                  // 如果验证失败，停止提交表单
                  return
                }
                // 如果验证成功，提交表单
                this.login()
              })
      }
    }
  }
</script>

<style scoped lang="less">
  .login-container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(./login_bg.jpg) no-repeat;
    background-size: cover;
  }
  .log-form-wrap{
    width: 300px;
    background-color: #fff;
    padding: 20px 15px 30px 15px;
  }
  .login-btn{
    width: 100%;
  }
.log-form-wrap img{
  height: 33px;
  margin: 0 75px;
  text-align: center;
}

</style>
