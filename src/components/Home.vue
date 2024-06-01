<template>
    <el-container class="home-container">
      <el-header>
        <div>
          <img alt="" src="../assets/login/SpeedCloud.svg">
          <span>网盘后台管理</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapsed ? '64px' : '200px'"
                  :style="{backgroundColor : this.backcolor}">
          <div class="toggle-button" @click="toggleCollapsed"
               :style="{backgroundColor : this.backcolor}">
            <div>
              <img src="../assets/menuList.svg" alt="">
              <span id='menuSpan' v-if="menuShow">菜单缩放</span>
            </div>
          </div>
          <!--侧边栏菜单区域-->
          <el-menu
            :background-color="backcolor"
            :collapse="isCollapsed"
            :default-active="activePath"
            :router="true"
            :unique-opened="true"
            :collapse-transition="false"
            text-color="#fff"
            active-text-color="#409BFF">
            <el-submenu :index="item.id+''" v-for = "item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
                <el-menu-item
                  :index="'/' + subItem.path"
                  v-for ="subItem in item.children"
                  :key="subItem.id"
                  @click="saveNavState('/' + subItem.path)">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.authName}}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      backcolor: '#000000',
      menuShow:true,
      imgsrc: '../assets/leftArrow.svg',
      transitionWord:'<<',
      menuList: [
        {
          id:'125',
          authName:'用户管理',
          path:'users',
          children:[
            {
              id:'104',
              authName:'用户列表',
              path:'users'
            }
          ]
        },
        // {
        //   id:'103',
        //   authName:'权限管理',
        //   path:'rights',
        //   children:[
        //     {
        //       id:'112',
        //       authName:'权限列表',
        //       path:'rights'
        //     },
        //     {
        //       id:'111',
        //       authName:'角色列表',
        //       path:'roles'
        //     }
        //   ]
        // },
        {
          id:'101',
          authName:'文件管理',
          path:'file',
          children:[
            {
              id:'110',
              authName:'文件列表',
              path:'file'
            }
          ]
        }
      ],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      activePath: '',
      isCollapsed: false,
      basecolor:''
    }
  },
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('login')
    },
    toggleCollapsed () {
      this.isCollapsed = !this.isCollapsed
      this.menuShow = !this.menuShow
      console.log(this.imgsrc)
    },
    async getMenuList() {
      const { data: res } = await this.$axios('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      //
      this.activePath = activePath
    }
  },
  name: 'home'
}
</script>

<style scoped>
.home-container{
  height:100%
}
#menuSpan{
  align-items: center;
  justify-content:space-between ;
  padding-left:0px;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  top:-8px;
  left:5px;
  box-sizing: border-box;
}
.el-header{
  background-color: #483D8B;
  display:flex;
  justify-content:space-between ;
  padding-left:0px;
  align-items: center;
  color:#ffffff;
  font-size: 20px;
}
.iconfont {
  margin-right: 10px
}
.el-header div{
  display: flex;
  align-items: center;
}
.el-header span{
  margin-left: 10px;
}

.home-container img{
  height: 25px;
}
.el-menu {
  border-right: none;
}
.el-main{
  background-color: #eaedf1;
}
.toggle-button {
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  margin-left: 16px;
  cursor: pointer;
  margin-top:14px;
}
</style>
