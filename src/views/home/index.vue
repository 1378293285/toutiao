<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="collapse?'64px':'200px'">
      <div class="logo" :class="{close:collapse}"></div>
      <!--default-active  指定默认选中的菜单
          background-color  指定背景颜色
          text-color  指定文字颜色
          active-text-color 指定选中菜单颜色 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
        >

        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
        <!-- 头部 -->
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="tooggleMenu()"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <el-dropdown trigger="click" style="float:right">
          <span class="el-dropdown-link">
            <img
              style="vertical-align: middle" width="30" height="30"
              :src="avatar" alt="">
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 显示二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('toutiao'))
    // console.log(user)
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    // 导航切换
    tooggleMenu () {
      this.collapse = !this.collapse
    },
    // 个人中心
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      window.sessionStorage.removeItem('toutiao')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png)
        no-repeat center / 140px auto
    }
    .close {
      background: url(../../assets/images/logo_admin_01.png)
        no-repeat center;
      background-size: 36px auto;
    }
  }
  .home-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }

  }
}

.el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
