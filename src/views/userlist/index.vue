<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>住址: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.phone }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="150">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.rolers" :key="tag" style="margin-left:3px;">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限管理" width="160">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.access" :key="tag" style="margin-left:3px;">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleRolers(scope.$index, scope.row)">修改权限</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="type==='edit'?'编辑用户信息':'用户修改角色'" width="80%">

      <el-form ref="form" :model="currentList" :rules="userRules" label-position="right" label-width="80px">
        <!-- 修改用户信息的 -->
        <el-form-item v-if="type=='edit'" label="姓名" prop="username">
          <el-input v-model="currentList.username"/>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="头像">
          <el-upload :show-file-list="false" class="avatar-uploader" action="123">
            <img v-if="currentList.avatar" :src="currentList.avatar" class="avatar" style="width:100px">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="手机号" prop="phone">
          <el-input v-model="currentList.phone"/>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="邮箱" prop="email">
          <el-input v-model="currentList.email"/>
        </el-form-item>
        <!-- 修改用户角色的 -->
        <el-form-item v-if="type=='roler'" label="我的角色">
          <el-tag v-for="tag in myRolers" :key="tag" style="margin-left:5px" closable @close="handleCloseRoler(tag)">
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item v-if="type=='roler'" label="权限">
          <el-tag v-for="tag in allRolers" :key="tag" style="margin-left:5px">
            <span @click="handleAddRoler(tag)">
              {{ tag }}
            </span>
          </el-tag>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-pagination :total="100" :current-page="current" layout="prev, pager, next" @current-change="handleChange"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    const phoneValidator = (rule, value, callback) => {
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const emailValidator = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      current: 1,
      dialogVisible: false,
      type: '', // 弹框的类型，如果是edit就是用户编辑信息，roler就是修改角色
      currentList: {},
      myRolers: [],
      allRolers: ['boss', 'developer', 'producter', 'operator', 'designer'],
      userRules: {
        username: [{ required: true, trigger: 'blur', message: '请填写姓名' }],
        phone: [{ required: true, trigger: 'blur', validator: phoneValidator }],
        email: [{ required: true, trigger: 'blur', validator: emailValidator }]
      }
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.userlist.list
    })
  },
  created() {
    this.getUserList()
  },
  methods: {
    ...mapActions({
      getUserList: 'userlist/getUserList',
      updataList: 'userlist/updataList',
      deleteUser: 'userlist/deleteUser'
    }),
    // 点击添加上面的角色
    handleAddRoler(tag) {
      console.log(tag)
      this.myRolers.push(tag)
      this.myRolers = [...new Set(this.myRolers)]
    },
    // 点击删除角色
    handleCloseRoler(tag) {
      const index = this.myRolers.findIndex(item => item === tag)
      this.myRolers.splice(index, 1)
    },
    // 点击修改权限
    handleRolers(index, row) {
      this.type = 'roler'
      this.dialogVisible = true
      this.currentList = { ...row }
      this.myRolers = [...row.rolers]
    },
    // 点击编辑信息
    handleEdit(index, row) {
      // console.log(index, row)
      this.dialogVisible = true
      this.type = 'edit'
      this.currentList = { ...row }
    },
    // 点击删除，删除用户信息
    handleDelete(index, row) {
      // console.log(index, row)
      const { id } = row
      this.deleteUser({ uid: id }).then(res => {
        this.$message({
          message: res,
          center: true,
          type: 'success'
        })
        this.getUserList({ page: this.current })
      }).catch(err => {
        this.$message({
          message: err,
          center: true,
          type: 'success'
        })
      })
    },
    // 改变页面 分页器
    handleChange(page) {
      console.log('page...', page)
      // 在分页器这里做点击事件，然后传参，传过去的是我们的页数，如果不加花括号，我们看到的只是一个单纯的数字
      // 然后在store里面接受数据，传给query，然后再promise里面调用我们的api，在api里面传递数据
      // 最后在api的url里面找到数据
      this.current = page
      this.getUserList({ page })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submit() {
      // console.log(1);
      // 点击确定之后验证
      this.$refs.form.validate(valid => {
        // console.log(valid);
        if (valid) {
          const { id, username, email, phone } = this.currentList
          this.updataList({ id, username, email, phone }).then(res => {
            this.$message({
              message: res,
              center: true,
              type: 'success'
            })
            // 修改之后不会让我们的页面跳回第一页
            this.getUserList({ page: this.current })
          }).catch(err => {
            this.$message({
              message: err,
              center: true,
              type: 'success'
            })
          })
        }
      })
      this.dialogVisible = false
    }
  }
}
</script>
