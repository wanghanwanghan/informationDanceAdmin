<template>
  <div>
    <el-dialog
      title="文件"
      :visible.sync="dialogVisible"
      width="50%">
      <img class="auth-book-img" :src="authBookImgFullPath"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="给用户反馈" :visible.sync="dialogForRemark">
      <el-form>
        <el-form-item label="" width="30%">
          <el-input type="textarea" v-model="remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForRemark = false">取 消</el-button>
        <el-button type="primary" @click="dialogForRemark = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="审核中">
        <el-table
          :data="tableData"
          @row-click="rowClick"
          border
          style="width: 100%">
          <el-table-column prop="company" label="用户所属公司" width="120"></el-table-column>
          <el-table-column prop="username" label="用户名称" width="120"></el-table-column>
          <el-table-column prop="email" label="邮件" width="160"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="entName" label="需授权公司" width="200"></el-table-column>
          <el-table-column prop="type" label="分类" width="80"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="updated_at" label="申请时间" width="100"></el-table-column>
          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click.native.stop="passAction(scope.$index, scope.row)">通过
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click.native.stop="noPassAction(scope.$index, scope.row)">不通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未通过">
        <el-table
          :data="tableData"
          @row-click="rowClick"
          border
          style="width: 100%">
          <el-table-column prop="company" label="用户所属公司" width="120"></el-table-column>
          <el-table-column prop="username" label="用户名称" width="120"></el-table-column>
          <el-table-column prop="email" label="邮件" width="160"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="entName" label="需授权公司" width="200"></el-table-column>
          <el-table-column prop="type" label="分类" width="80"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="updated_at" label="未通过时间" width="100"></el-table-column>
          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click.native.stop="passAction(scope.$index, scope.row)">通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已通过">
        <el-table
          :data="tableData"
          @row-click="rowClick"
          border
          style="width: 100%">
          <el-table-column prop="company" label="用户所属公司" width="120"></el-table-column>
          <el-table-column prop="username" label="用户名称" width="120"></el-table-column>
          <el-table-column prop="email" label="邮件" width="160"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="entName" label="需授权公司" width="200"></el-table-column>
          <el-table-column prop="type" label="分类" width="80"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="updated_at" label="已通过时间" width="100"></el-table-column>
          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click.native.stop="noPassAction(scope.$index, scope.row)">不通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      dialogVisible: false,
      dialogForRemark: false,
      remark: '',
      authBookName: '',
      tableData: []
    }
  },
  // inject: [],
  computed: {
    authBookImgFullPath() {
      return 'https://api.meirixindong.com/Static/Image/AuthBook/' + this.authBookName
    }
  },
  // watch: {},
  mounted() {
    this.getData(1)
  },
  // beforeCreate() {
  // },
  // created() {
  // },
  // beforeMount() {
  // },
  // beforeUpdate() {
  // },
  // updated() {
  // },
  // beforeDestroy() {
  // },
  // destroyed() {
  // },
  // activated() {
  // },
  // deactivated() {
  // },
  methods: {
    getData(status) {
      let obj = {
        status: status,
        page: 1,
        pageSize: 10
      }
      this.$http.post('admin/v1/user/getUserAuthBook', obj).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          res.result.forEach(item => {
            item.updated_at = parseTime(item.updated_at, '{y}-{m}-{d}')
            switch (item.type) {
              case 1:
                item.type = '财务'
                break
              case 2:
                item.type = '深度报告'
                break
              default:
                item.type = 'error'
            }
          })
          this.tableData = res.result
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    examination(id, status, remark) {
      let obj = {
        id: id,
        status: status,
        remark: remark
      }
      this.$http.post('admin/v1/user/handleUserAuthBook', obj).then(({
        data: res
      }) => {
        if (res.code === 200) {
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    passAction(index, row) {
      let authBookTableId = row.id
      this.examination(authBookTableId, 3)
      this.tableData.splice(index, 1)
    },
    noPassAction(index, row) {
      let authBookTableId = row.id
      this.examination(authBookTableId, 2)
      this.tableData.splice(index, 1)
    },
    tabClick(tab, event) {
      let status = Number(tab.paneName) + 1
      this.getData(status)
    },
    rowClick(row, column, event) {
      this.authBookName = row.name
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-book-img {
  width: 100%;
}
</style>
