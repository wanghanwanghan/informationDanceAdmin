<template>
  <div>

    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          label="文件名称"
          width="300"
          prop="file_name">
        </el-table-column>
        <el-table-column
          align="center"
          label="文件的类型"
          width="300"
          prop="file_type">
        </el-table-column>
        <el-table-column
          align="center"
          label="文件大小"
          width="220"
          prop="file_size_mb">
        </el-table-column>
        <el-table-column
          align="center"
          label="文件行数"
          prop="file_line">
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="file_c_time">
        </el-table-column>
        <el-table-column align="center" label="查看详情">
          <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleRespDetail(scope.row.info)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="提示"
        :visible="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
          <json-viewer :value="jsonData" :expand-depth=10 copyable sort></json-viewer>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: '',
  inject: ['reload'],
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      form: {
        entname: '',
        statusWord: [],
        status: []
      },
      sel_options: [],
      date: '',
      elPagination: {
        page: 1,
        pageSize: 20,
        total: 100
      },
      dialogVisible: false,
      jsonData: {}
    }
  },
  computed: {},
  mounted() {
    this.pageChange(1)
  },
  methods: {
    handleRespDetail(resp) {
      this.dialogVisible = true
      this.jsonData = resp
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    pageChange(index) {
      let obj = this.form
      this.$http.post('admin_provide/v1/log/getErrList', obj).then(({
          data: res
        }) => {
        this.tableData = res.result
        this.tableData.forEach((item) => {
          item.file_c_time = parseTime(item.file_c_time)
        })
      }).catch((err) => {

      })
    },
  },
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin-top: 14px;
  width: 100%;
  display: flex;

  .search-left {
    width: 100%;
  }

  .search-right {
    flex: 1;
  }
}

.table-wrapper {
  border-top: 1px solid #EBEEF5;
}

::v-deep .demo-table-expand {
  font-size: 0;
}

::v-deep .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

::v-deep .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
