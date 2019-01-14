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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :total="100" :current-page="current" layout="prev, pager, next" @current-change="handleChange"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      current: 1
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
      getUserList: 'userlist/getUserList'
    }),
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleChange(page) {
      console.log('page...', page)
      // 在分页器这里做点击事件，然后传参，传过去的是我们的页数，如果不加花括号，我们看到的只是一个单纯的数字
      // 然后在store里面接受数据，传给query，然后再promise里面调用我们的api，在api里面传递数据
      // 最后在api的url里面找到数据
      this.getUserList({ page })
    }
  }
}
</script>
