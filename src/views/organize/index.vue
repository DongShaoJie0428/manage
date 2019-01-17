<template>
  <div>
    <!-- 树形控件 -->
    <div class="custom-tree-container">
      <div class="block">
        <!-- draggable 拖拽 -->
        <el-tree ref="tree" :data="newData" :expand-on-click-node="false" draggable show-checkbox node-key="id" default-expand-all>
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.data.name }}</span>
            <span>
              <!-- 加上v-permission="['admin']"会报错，我们在main.js里面引入自定义指令，然后在文件夹里面把那句话复制出来然后在引入vue -->
              <el-button v-permission="['admin']" type="text" size="mini" @click="() => append(node,data)">
                Append
              </el-button>
              <el-button v-permission="['admin']" type="text" size="mini" @click="() => remove(node, data)">
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 提示框 -->
    <el-dialog :visible.sync="dialogVisible" title="提示" width="60%">
      <el-input v-model="temp" type="text" placeholder="请输入您要修改的职位" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: {},
      type: '',
      temp: '',
      dialogVisible: false,
      newData: [],
      organize: [{
        id: 1, name: '***事业部', parentid: ''
      }, {
        id: 2, name: '***事业部', parentid: ''
      }, {
        id: 3, name: '总经办', parentid: ''
      }, {
        id: 4, name: '技术研发', parentid: 1
      }, {
        id: 5, name: '产品研发', parentid: 1
      }, {
        id: 6, name: '市场渠道', parentid: 1
      }, {
        id: 7, name: '商业合作', parentid: 1
      }, {
        id: 8, name: '前端开发', parentid: 4
      }, {
        id: 9, name: '后端开发', parentid: 4
      }, {
        id: 10, name: 'ios开发', parentid: 4
      }, {
        id: 11, name: 'android开发', parentid: 4
      }, {
        id: 12, name: '测试', parentid: 4
      }, {
        id: 13, name: '运维', parentid: 4
      }, {
        id: 14, name: '设计', parentid: 4
      }, {
        id: 15, name: '产品', parentid: 5
      }, {
        id: 16, name: '运营', parentid: 5
      }, {
        id: 17, name: '产品总监', parentid: 15
      }, {
        id: 18, name: '产品经理', parentid: 15
      }, {
        id: 19, name: '资深前端开发', parentid: 8
      }, {
        id: 20, name: '高级前端开发', parentid: 8
      }, {
        id: 21, name: '初级前端开发', parentid: 8
      }, {
        id: 22, name: '孙月', parentid: 20
      }]
    }
  },
  created() {
    this.formatData(this.organize)
    // console.log('243567867:::', this.$route)
  },
  methods: {
    formatData(arr) {
      const newArr = []
      // 在第一层的时候我们要先遍历一遍
      arr.forEach(item => {
        // 判断是否存在第一层parentid,如果不存在，就是第一层领头的
        if (!item.parentid) {
          // 然后push在新数组中
          newArr.push(item)
        } else { // 否则就是有parentid
          this.findItem(newArr, item)
        }
      })
      // 赋值
      this.newData = newArr
      console.log('newArr', newArr)
    },
    // 递归查找当前项的父元素
    findItem(arr, item) {
      // 遍历第二层的id
      arr.forEach(value => {
        // 如果id===parentid
        if (value.id === item.parentid) {
          // 然后判断在里面是不是还有下一层children
          if (value.children) {
            // 有的话就push这一项
            value.children.push(item)
          } else {
            // 没有就创建一个children，然后push
            value.children = [item]
          }
        } else if (value.children) {
          // 用递归在调用自身
          // 如果后代存在，去后代里面找
          this.findItem(value.children, item)
        }
      })
    },
    // 点击添加弹框出现 并且获取node和data
    append(node, data) {
      this.dialogVisible = true
      this.current = {
        node,
        data
      }
      console.log(node, '...node', data, '...data')
    },
    // 点击删除
    remove(node, data) {
      this.$refs.tree.remove(node)
    },
    // 点击确定
    handleSubmit() {
      console.log(0)
      // 如果里面有值
      if (this.temp) {
        // 创建一个新对象
        const newData = {
          // 要获取三个值id，name,parentid
          // id就是那个新数据找到他的长度减一找见id+1
          id: this.organize[this.organize.length - 1].id + 1,
          name: this.temp,
          parentid: this.current.data.id
        }
        this.organize.push(newData)
        // 然后要添加进去就要先获取元素，ref，append添加有两个参数
        this.$refs.tree.append(newData, this.current.node)
        this.dialogVisible = false
        this.temp = ''
      }
    }
  }
}
</script>

<style>

</style>
