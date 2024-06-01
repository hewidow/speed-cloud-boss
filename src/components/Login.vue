<template>
  <div class="admin_container">
    <div class="login_box">
      <div class="login_pic" align="center">
        <img src="../assets/login/SpeedCloud.svg" alt="">
      </div>
      <div class="login_form">
        <el-form ref= "LoginFormRef" class="login_formitem" :model="loginForm" :rules="loginFormRules" >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
              prefix-icon="iconfont icon-user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="iconfont icon-3702mima">
            </el-input>
          </el-form-item>
          <el-form-item class="login_btns">
            <el-button @click="adminLogin"
                       type="primary"
                       round>
              登录
            </el-button>
            <el-button @click="resetLoginForm"
                       type="info"
                       round>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'admin_login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 验证规则
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在3到15个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在3到15个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.LoginFormRef.resetFields()
    },
    adminLogin () {
      this.$refs.LoginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.post('login', this.loginForm)
        if (res.code !== 200) return this.$message.error('登录失败')
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.token)
        console.log(res)
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.admin_container
{
  background-color: #2b4b6b;
  height: 100%;
  width: 100%
}
.login_box{
  width:450px;
  height:300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.login_formitem{
  position: absolute;
  bottom: 0;
  width:100%;
  padding:  0 20px;
  box-sizing: border-box;
}
.login_btns{
  display:flex;
  justify-content: flex-end;
}
.login_pic{
  height:100px;
  width:200px;
  position: absolute;
  left:50%;
  transform: translate(-50%,15%);
  img{

    height:100%;
    width:100%;
  }
}
</style>
