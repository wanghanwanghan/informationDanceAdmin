<template>
  <div>
    <el-row>
      <el-button type="text" @click="handleClickAddUser" class="addUserBtn-class">添加用户</el-button>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth">
            <el-input v-model="form.company" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth">
            <el-select v-model="form.money" placeholder="请选择金额">
              <el-option label="500" value="500"></el-option>
              <el-option label="1000" value="1000"></el-option>
              <el-option label="2000" value="2000"></el-option>
              <el-option label="5000" value="5000"></el-option>
              <el-option label="10000" value="10000"></el-option>
              <el-option label="20000" value="20000"></el-option>
              <el-option label="50000" value="50000"></el-option>
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
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="company" label="公司"></el-table-column>
      <el-table-column prop="password" label="密码" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="220"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="money" label="账户余额" width="100"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="130"></el-table-column>
      <el-table-column label="操作" width="150">
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
  inject: ['reload'],
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
        phone: '',
        username: '',
        password: '',
        company: '',
        email: '',
        money: '',
        created_at: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  // watch: {},
  mounted() {
    this.getUserData()
  },
  methods: {
    handleClickAddUser() {
      this.form.actionType = 'insert'
      this.form.phone = ''
      this.form.username = ''
      this.form.password = ''
      this.form.company = ''
      this.form.email = ''
      this.form.money = ''
      this.form.created_at = ''
      this.dialogFormVisible = true
    },
    handleEdit(index, rowObj) {
      this.form.actionType = 'update'
      this.form.phone = rowObj.phone
      this.form.username = rowObj.username
      this.form.password = rowObj.password
      this.form.company = rowObj.company
      this.form.email = rowObj.email
      this.form.money = rowObj.money
      this.form.created_at = rowObj.created_at
      this.dialogFormVisible = true
    },
    handleUserInfo(rel) {
      rel.forEach(item => {
        item.money = Number(item.money)
        item.created_at = parseTime(item.created_at, '{y}-{m}-{d}')
      })
      return rel
    },
    handleAddUser() {
      let obj = {
        'actionType': this.form.actionType,
        'phone': this.form.phone,
        'username': this.form.username,
        'password': this.form.password,
        'company': this.form.company,
        'email': this.form.email,
        'money': this.form.money,
        'created_at': this.form.created_at
      }
      this.$http.post('admin/v1/user/addUser', obj).then(({
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
      let obj = {
        page: 1,
        pageSize: 10000
      }
      this.$http.post('admin/v1/user/list', obj).then(({
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
