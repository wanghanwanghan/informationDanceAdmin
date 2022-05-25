<template>
  <div>
    <div class="search-wrapper">
      <div class="search-left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="企业名称">
            <el-select
              v-model="form.date"
              filterable
              remote
              reserve-keyword
              placeholder="请输入企业名"
              :remote-method="remoteMethod"
              :loading="loading"
              :style="{width:'300px'}">
              <el-option
                v-for="item in sel_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="search-right">
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="中标供应商">
                <span>{{ props.row.中标供应商 }}</span>
              </el-form-item>
              <el-form-item label="采购单位名">
                <span>{{ props.row.采购单位名称 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          label="标题"
          width="300"
          prop="标题">
        </el-table-column>
        <el-table-column
          align="center"
          label="公告日期"
          width="220"
          prop="公告日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="公告类型"
          prop="公告类型2">
        </el-table-column>
        <el-table-column
          align="center"
          label="中标金额"
          prop="中标金额">
        </el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-right:20px;float: right">
        <el-button type="primary" round @click="createZip">下载</el-button>
      </div>
    </div>
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
        date: ''
      },
      sel_options: []
    }
  },
  computed: {},
  mounted() {
    this.getIndex()
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.form.date = query
        this.getIndex()
      } else {
        this.options = []
      }
    },
    getIndex() {
      this.$http.post('admin_provide/v1/TenderingAndBidding/getList', this.form).then(({
        data: res
      }) => {
        this.sel_options = []
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.result
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    createZip() {
      this.$http.post('admin_provide/v1/TenderingAndBidding/createZip', {
        'zip_arr': this.multipleSelection
      }).then(({
        data: res
      }) => {
        if (res.result.length > 5) {
          window.location.href = 'https://api.meirixindong.com/Static/Temp/' + res.result + '.xlsx'
          this.getIndex()
        } else {
          this.$message.success('未发现数据')
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
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
