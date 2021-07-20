<template>
  <div>
    <el-row>
      <el-button type="text" @click="handleClickAddUser" class="addUserBtn-class">添加用户</el-button>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="公司/用户名称" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth">
            <el-select v-model="form.money" placeholder="请选择金额">
              <el-option label="1000" value="1000"></el-option>
              <el-option label="3000" value="3000"></el-option>
              <el-option label="9000" value="9000"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="username" label="公司/用户名称" width="200"></el-table-column>
      <el-table-column prop="appId" label="appId" width="300"></el-table-column>
      <el-table-column prop="appSecret" label="密钥" width="200"></el-table-column>
      <el-table-column prop="allowIp" label="ip白名单" width="100"></el-table-column>
      <el-table-column prop="money" label="账户余额"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: '',
  components: {},
  // filters: {},
  props: {},
  // provide() {
  //   return {}
  // },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        actionType: 'insert',
        user_id: '',
        username: '',
        money: ''
      },
      formLabelWidth: '120px'
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.getUserData()
  },
  methods: {
    handleClickAddUser() {
      this.form.actionType = 'insert'
      this.form.username = ''
      this.form.money = ''
      this.dialogFormVisible = true
    },
    handleEdit(index, rowObj) {
      this.form.actionType = 'update'
      this.form.user_id = rowObj.id
      this.form.username = rowObj.username
      this.form.money = rowObj.money
      this.dialogFormVisible = true
    },
    handleUserInfo(rel) {
      rel.forEach(item => {
        item.status === 1 ? item.status = '正常' : item.status = '异常'
        item.money = Number(item.money)
        item.created_at = parseTime(item.created_at, '{y}-{m}-{d}')
      })
      return rel
    },
    handleAddUser() {
      let obj = {
        'actionType': this.form.actionType,
        'user_id': this.form.user_id,
        'username': this.form.username,
        'money': this.form.money
      }
      this.$http.post('admin_provide/v1/user/addUser', obj).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getUserData()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch((err) => {
        console.error(err)
      })
      this.dialogFormVisible = false
    },
    getUserData() {
      this.$http.post('admin_provide/v1/user/getUserList', {}).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.tableData = this.handleUserInfo(res.result)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addUserBtn-class {
  padding-left: 10px;
}
</style>
