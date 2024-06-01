<template>
  <div>
    <img id="i-viewer" src="" alt="Picture" style="visibility: hidden;width: 0;height: 0">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input
            v-model="queryInfo.query"
            class="input-with-select"
            clearable placeholder="请输入内容"
            @clear="getFileList"
            @keyup.enter.native="getFileList">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getFileList">
            </el-button>
          </el-input>
        </el-col>
<!--        <el-col :span="4">-->
<!--          <el-button type="primary" @click="addDialogVisible = true">添加文件</el-button>-->
<!--        </el-col>-->
      </el-row>

      <!--  用户列表区域-->
      <el-table :data="fileList"
                :stripe="true"
                border
                style="width: 100%">
        <el-table-column label="文件id"
                         prop="fileId">
        </el-table-column>
<!--        <el-table-column label="文件名"-->
<!--                         prop="filename">-->
<!--        </el-table-column>-->
        <el-table-column label="文件Md5码"
                         width="300"
                         prop="fileMd5">
        </el-table-column>
        <el-table-column label="文件大小"
                         prop="fileSize">
        </el-table-column>
        <el-table-column label="文件类型"
                         prop="fileType">
        </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽渲染状态这一列 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isBanned"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="fileStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
<!--&lt;!&ndash;             修改按钮&ndash;&gt;-->
<!--            <el-tooltip :enterable="false" class="item" content="修改文件" effect="dark" placement="top">-->
<!--              <el-button icon="el-icon-edit" size="mini" type="primary"-->
<!--              @click="goPhoto">-->
<!--&lt;!&ndash;                         @click="showEditDialog(scope.row.id)">&ndash;&gt;-->
<!--              </el-button>-->
<!--            </el-tooltip>-->

<!--            &lt;!&ndash; 删除按钮&ndash;&gt;-->
<!--            <el-tooltip :enterable="false" class="item" content="删除文件" effect="dark" placement="top">-->
<!--              <el-button icon="el-icon-delete" size="mini" type="danger"-->
<!--                         @click="removeFileById(scope.row.fileId)">-->
<!--              </el-button>-->
<!--            </el-tooltip>-->
<!--            审阅文件按钮-->
            <el-tooltip :enterable="false" class="item" content="审阅文件" effect="dark" placement="top">
              <el-button icon="el-icon-edit" size="small" type="warning"

                         @click="showFileDialog(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
        :current-page="this.queryInfo.pagenum"
        :page-size="this.queryInfo.pagesize"
        :page-sizes="[2, 4, 5, 10]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <!--close方法触发事件为关闭对话框-->
<!--    <el-dialog-->
<!--      :visible.sync="addDialogVisible"-->
<!--      title="添加文件"-->
<!--      width="35%"-->
<!--      @close="addDialogClosed">-->
<!--      &lt;!&ndash; 内容主体区域 &ndash;&gt;-->
<!--      <el-form ref="addFormRef"-->
<!--               :model="addForm"-->
<!--               :rules="addFormRules"-->
<!--               label-width="70px">-->
<!--        &lt;!&ndash; prop=username 对应了 addFormRules中的username校验规则,v-model对应的是下面的addForm对象&ndash;&gt;-->
<!--        <el-form-item label="md5码" prop="filemd5">-->
<!--          <el-input v-model="addForm.filemd5"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文件大小" prop="filesize">-->
<!--          <el-input v-model="addForm.filesize"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文件类型" prop="type">-->
<!--          <el-input v-model="addForm.filetype"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      &lt;!&ndash; 底部区域 &ndash;&gt;-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="addDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="addFile">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
<!--    文件预览框-->
    <el-dialog
      :visible.sync="fileDialogVisible"
      title="审阅文件"
      width="40%"
      center
      @close="fileDialogClosed">
<!--      pdf-->
<!--      <iframe :src="src" frameborder="0" height="100%" width="100%">-->
<!--        <p>Your browser does not support iframes.</p>-->
<!--      </iframe>-->

      <!-- 内容主体区域 -->
      <video
        id="my-video"
        class="video-js vjs-big-play-centered"
        controls
        preload="auto"
        style="width: 100%;height:300px"
      >
        <source :src="src"/>
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a
          >
        </p>
      </video>
<!--    <el-button type="primary" @click="showFileVisble = false">确定</el-button>-->
<!--    <el-button type="primary" @click="goPhoto">确 定2</el-button>-->
    </el-dialog>
  </div>
</template>

<script>
import videojs from 'video.js'
import Viewer from 'viewerjs'
export default {
  data () {
    return {
      viewer:null,
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pageNumber: 1,
        pageSize: 10
      },
      fileList: [

      ],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      // addDialogVisible: false,
      // 添加文件的表单数据
      // addForm: {
      //   filename: '',
      //   filemd5: '',
      //   filesize: '',
      //   filetype: ''
      // },
      // 添加表单的验证规则对象
      // addFormRules: {
      //   filename: [
      //     {
      //       message: '请输入文件名',
      //       trigger: 'blur'
      //     }
      //   ],
      // 验证md5是否合法
      //   filemd5: [
      //     {
      //       message: '请输入md5码',
      //       trigger: 'blur'
      //     }
      //   ],
      //   filesize: [{
      //     message: '请输入文件大小',
      //     trigger: 'blur'
      //   }],
      //   filetype: [
      //     {
      //       message: '请输入文件类型',
      //       trigger: 'blur'
      //     }
      //   ]
      // },
      src:'',
      // 控制修改用户对话框的显示和隐藏
      fileDialogVisible:false,
      // 查询到的用户信息对象
      fileInfo: {},
      token:''
    }
  },
  created () {
    this.getFileList()
    this.getToken()
  },
  // watch: {
  //   src () {
  //     this.$nextTick(() => {
  //       videojs('my-video')
  //     })
  //   }
  // },
  methods: {
    getToken() {
      this.token = window.sessionStorage.getItem('token')
    },
    goPhoto () {
      if (!this.viewer) {
        this.viewer = new Viewer(document.getElementById('i-viewer'), {
          keyboard: false,
          navbar: false,
          url: () => {
            return '/'
          }
        })
      }
      this.viewer.options.url = () => {
        return this.src
      }
      this.viewer.show()
    },
    async getFileList () {
      console.log(this.queryInfo)
      const { data : res } = await this.$axios.post('fileList', this.queryInfo)
      this.fileList = res.data.data
      this.total = res.data.totalRecordNumber
      console.log(res)
    },
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getFileList()
    },
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNumber = newPage
      this.getFileList()
    },
    async fileStateChanged (fileInfo) {
      // eslint-disable-next-line no-unused-vars
      let state = 0
      if (fileInfo.isBanned) {
        state = 1
      }
      const { data: res } = await this.$axios.post('updateFile', {
        fileId: fileInfo.fileId,
        isBanned:state
      })
      if (res.code !== 200) {
        fileInfo.isBanned = !fileInfo.isBanned
        return this.$message.error('更新用户状态失败!')
      }
      this.$message.success('更新用户状态成功!')
    },
    /**
   * 显示展示文件
   * @param id
   */
    async showFileDialog (fileInfo) {
      // const { data: res } = await this.$axios.get(`files/${fileInfo.fileId}`)
      // if (res.code !== 200) {
      //   //
      //   this.$message.error('查询文件信息失败!')
      // }
      console.log(fileInfo)
      if (fileInfo.fileType === 'mp4') {
        this.playVideo(fileInfo.fileId)
        // eslint-disable-next-line no-unused-expressions
      } else if (fileInfo.fileType === 'jpg') {
        this.playPicture(fileInfo.fileId)
      }
    },
    /**
   * 监听修改用户对话框的关闭事件
   */
    async playVideo(fileId) {
      const { data: res } = await this.$axios.get(`rootPlayVideo?fileId=${fileId}`)
      console.log(res)
      this.fileDialogVisible = true
      this.src = res.data.url
      this.$nextTick(() => {
        videojs('my-video').src(this.src)
        videojs('my-video').play()
      })
    },
    async playPicture(fileId) {
      this.src = `${window.location.protocol}//${window.location.host}/api/rootView?fileId=${fileId}&token=${this.token}`
      this.goPhoto()
    },
    editDialogClosed () {
    // 当第一次打开修改表单, 若触发数据校验提示, 在第二次打开还会出来
    // 这时候就是需要使用下面这行代码重置修改表单
      this.$refs.editFormRef.resetFields()
    },
    /**
   * 修改用户信息并提交
   */
    fileDialogClosed () {
      videojs('my-video').pause()
    },
    /**
   * 根据Id删除对应的用户信息
   * @param id
   */
    // async removeFileById (id) {
    // // console.log(id)
    // // 弹框询问用户是否删除数据
    //   const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).catch(err => {
    //     return err
    //   })
    //   // 如果用户确认删除, 则返回值为字符串 confirm
    //   // 如果用户取消删除, 则返回值为字符串 cancel
    //   // console.log(confirmResult)
    //   if (confirmResult !== 'confirm') {
    //     return this.$message.info('已取消删除!')
    //   } else {
    //     console.log('确认了删除!')
    //     const { data: res } = await this.$axios.delete(`users/${id}`)
    //     if (res.meta.status !== 200) {
    //       return this.$message.error('删除文件失败!')
    //     } else {
    //     // 重新获取用户列表, 来刷新页面
    //       this.getFileList()
    //       return this.$message.success('删除文件成功!')
    //     }
    //   }
    // },
  },
  name: 'file'
}
</script>

<style scoped>

</style>
