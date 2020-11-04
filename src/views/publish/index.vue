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
        <el-form ref="form" :model="article" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
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
import axios from 'axios'
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
      }
    }
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

    },
    //根据地址栏是否有id判断路由过来的是发布还是修改
    judgePuborMod () {
      const authorization = JSON.parse(window.localStorage.getItem('Authorization'))
      if (this.$route.query.id) {
        //获取该id文章的详情并展示
        getArticle(authorization,this.$route.query.id).then(res => {
          this.article = res.data.data
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
