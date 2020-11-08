<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div >
        <el-form ref="publishform" :rules="rules" :model="article" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-tiptap
              v-model="article.content"
              :extensions="extensions"
              lang="zh"
              placeholder="请输入内容..."
              :height="400"
            />
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择">
              <el-option
              v-for="item in channellist"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pubArticle(false)" >{{ $route.query.id ? '修改' : '发布'}}</el-button>
            <el-button>存为草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>


<script>
import { getChannelLists } from '@/api/channel'
import { publishArticle , getArticle , updateArticle } from '@/api/publish'
import { upLoadImage } from '@/api/image'
// import axios from 'axios'
import 'element-tiptap/lib/index.css'
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  CodeBlock,
  Image,
  ElementTiptap
   } from 'element-tiptap'
export default{
  name: 'Publish',
  data () {
    return {
      channellist:[],
      article:{
        title: '',
        content: '',
        cover:{
          type:0,
          images:[]
        },
        channel_id:''
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new CodeBlock(),
        // 逻辑富文本笔记中的图片上传到服务器，服务器返回url地址显示，不适用base64
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image',file)
            return upLoadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
      // 验证规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur'},
          { min:3, max: 20, message: '长度在3到20个字符', trigger: 'blur'}
        ],
        content: [
          { required: true, message: '请输入内容',trigger: 'change'}
        ],
        channel_id: [
          { required: true, message: '请选择频道'}
        ]
      }
    }
  },
  components: {
    'el-tiptap': ElementTiptap
  },
  methods: {
    // 加载频道
    loadChannel () {
      const authorization = JSON.parse(window.localStorage.getItem('Authorization'))
      getChannelLists(authorization).then(res => {
        this.channellist = res.data.data.channels
      })
    },
    // 点击按钮发布文章
    pubArticle(draft){
      //首先对表单进行验证
      this.$refs['publishform'].validate((valid) => {
        if (!valid) {
          return
        }
        const authorization = JSON.parse(window.localStorage.getItem('Authorization'))
        if (this.$route.query.id) {
           // 修改文章
           updateArticle(this.$route.query.id, this.article, authorization, draft).then(res => {
             this.$message({
               message:"修改成功",
               type:'success'
             })
             this.$router.push('/article')
           })
        }else{
          // 发布文章
          publishArticle(this.article,authorization,draft).then(res => {
            this.$message({
              message:draft ? "存入草稿成功" : "发布成功",
              type:'success'
            })
            this.$router.push('/article')
          }).catch(err => {
            this.$message({
              message:"发布失败",
              type:'warning'
            })
          })
        }
      })
    },
    
    //根据地址栏是否有id判断路由过来的是发布还是修改
    judgePuborMod () {
      const authorization = JSON.parse(window.localStorage.getItem('Authorization'))
      if (this.$route.query.id) {
        //获取该id文章的详情并展示
        getArticle(authorization,this.$route.query.id).then(res => {
          this.article=res.data.data
        })

      }
    }

  },

  created () {
    this.loadChannel()
    //判断是发布还是修改
    this.judgePuborMod()
  },
}
</script>

<style>
</style>
