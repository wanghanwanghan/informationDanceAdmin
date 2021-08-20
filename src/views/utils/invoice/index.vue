<template>
  <div>
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="法人姓名">
                <span>{{ props.row.legalPerson }}</span>
              </el-form-item>
              <el-form-item label="法人手机">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="百度api地址">
                <span>{{ props.row.province }}-{{ props.row.city }}-{{ props.row.county }}-{{ props.row.town }}</span>
              </el-form-item>
              <el-form-item label="工商地址">
                <span>{{ props.row.regAddress }}</span>
              </el-form-item>
              <el-form-item label="市行政区划">
                <span>{{ props.row.cityCode }}</span>
              </el-form-item>
              <el-form-item label="授权书文件">
                <span>{{ props.row.filePath }}</span>
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
          label="企业名称"
          width="220"
          prop="entName">
        </el-table-column>
        <el-table-column
          align="center"
          label="统一代码"
          width="220"
          prop="socialCredit">
        </el-table-column>
        <el-table-column
          align="center"
          label="发起授权时间"
          prop="requestDate">
        </el-table-column>
        <el-table-column
          align="center"
          label="授权书生成时间"
          prop="authDate">
        </el-table-column>
        <el-table-column
          align="center"
          label="发出授权书时间"
          prop="sendDate">
        </el-table-column>
        <el-table-column
          align="center"
          label="可以取数时间"
          prop="getDataDate">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-right:20px;float: right">
        <el-button type="primary" round>生成zip包</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  computed: {},
  mounted() {
    this.getIndex()
  },
  methods: {
    downloadFile(index, row) {
      window.location.href = 'https://api.meirixindong.com/Static/Temp/' + row.file_name
    },
    getIndex() {
      this.$http.post('admin_provide/v1/invoice/getList', {}).then(({
        data: res
      }) => {
        if (res.code === 200) {
          res.result.forEach(ele => {
            ele.requestDate = parseTime(ele.requestDate, '{y}-{m}-{d} {h}:{i}:{s}')
            ele.authDate = parseTime(ele.authDate, '{y}-{m}-{d} {h}:{i}:{s}')
            ele.sendDate = parseTime(ele.sendDate, '{y}-{m}-{d} {h}:{i}:{s}')
            ele.getDataDate = parseTime(ele.getDataDate, '{y}-{m}-{d} {h}:{i}:{s}')
            ele.created_at = parseTime(ele.created_at, '{y}-{m}-{d} {h}:{i}:{s}')
            ele.updated_at = parseTime(ele.updated_at, '{y}-{m}-{d} {h}:{i}:{s}')
          })
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
      console.log(this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
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
