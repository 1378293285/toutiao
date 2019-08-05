<template>
  <div class="login-conatiner">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <el-form ref="LoginForm" :model="LoginForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input  v-model="LoginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item class="login-check">
          <el-checkbox v-model="checked"></el-checkbox>
          我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>
          和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        return callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      // 表单对应对象
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        // 表单校验规则
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '手机号必填', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      // 整体表单的校验
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          // 如果校验成功，进行登录
          this.$axios
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.LoginForm)
            .then(res => {
              // const data = res.data
              // console.log(data)
              // 登录成功 跳转到首页
              this.$router.push('/')
            }).catch(() => {
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-conatiner {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg)
    no-repeat center / cover;
  .box-card {
    width: 410px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    // padding: 20px;
    transform: translate(-50%,-50%);
    img {
      display: block;
      height: 50px;
      margin: 0 auto 10px;
    }
  }
}
.el-link {
  vertical-align: bottom;
}
.login-check {
  color: #ccc;
  // margin-bottom: 10px;
}
</style>
