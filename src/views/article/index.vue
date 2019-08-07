<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 <b>{{total}}</b> 条结果</div>
      <el-table :data="articles">
        <el-table-column label="封面" width="220px">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt="" width='100' height='75'>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 表单数据
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_oubdate: null,
        pager: 1,
        per_page: 20
      },

      // 日期控件数据
      dateValues: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取列表数据
    this.getArticles()
  },
  methods: {
    // 编辑跳转
    edit (id) {
      // this.$router.push('/publish?id=' + id) 或者
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (values) {
      // 给begin_pubdate end_oubdate 赋值
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },

    // 获取列表数据
    async getArticles () {
      const { data: { data } } = await this.$axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      // newPage 当前点击的按钮的页码
      // 更新提交给后台的参数
      this.reqParams.page = newPage
      // 获取列表数据
      this.getArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>
