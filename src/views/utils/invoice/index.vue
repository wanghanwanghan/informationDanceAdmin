<template>
  <div>
    <div class="search-wrapper">
      <div class="search-left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="企业名称">
            <el-select
              v-model="form.entname"
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
          <el-form-item label="数据状态">
            <el-checkbox-group v-model="form.statusWord" @change="checkboxGroupChange">
              <el-checkbox label="收到授权请求" name="type"></el-checkbox>
              <el-checkbox label="授权书已生成" name="type"></el-checkbox>
              <el-checkbox label="已提交给大象" name="type"></el-checkbox>
              <el-checkbox label="可以取数据了" name="type"></el-checkbox>
            </el-checkbox-group>
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
                <el-button type="success" size="mini" plain @click="showAuthBook(props.row.filePath)">查看授权书</el-button>
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
          prop="canGetDataDate">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-right:20px;float: right">
        <el-button type="warning" round @click="createGetDataTime">创建可以取数时间</el-button>
        <el-button type="primary" round @click="createZip">生成未授权的zip包</el-button>
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
        entname: '',
        statusWord: [],
        status: []
      },
      sel_options: []
    }
  },
  computed: {},
  mounted() {
    this.getIndex()
  },
  methods: {
    showAuthBook(file) {
      window.location.href = 'https://api.meirixindong.com/Static/InvAuth/' + file
    },
    checkboxGroupChange() {
      this.form.status = []
      this.form.statusWord.forEach(ele => {
        switch (ele) {
          case '收到授权请求':
            this.form.status.push(0)
            break
          case '授权书已生成':
            this.form.status.push(1)
            break
          case '已提交给大象':
            this.form.status.push(2)
            break
          case '可以取数据了':
            this.form.status.push(3)
            break
        }
      })
      this.form.status = JSON.stringify(this.form.status)
      this.getIndex()
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.form.entname = query
        this.getIndex()
      } else {
        this.options = []
      }
    },
    getIndex() {
      this.$http.post('admin_provide/v1/invoice/getList', this.form).then(({
        data: res
      }) => {
        this.sel_options = []
        this.loading = false
        if (res.code === 200) {
          res.result.forEach(ele => {
            ele.requestDate = parseTime(ele.requestDate, '{y}-{m}-{d}')
            ele.authDate = parseTime(ele.authDate, '{y}-{m}-{d}')
            ele.sendDate = parseTime(ele.sendDate, '{y}-{m}-{d}')
            ele.getDataDate = parseTime(ele.getDataDate, '{y}-{m}-{d}')
            ele.created_at = parseTime(ele.created_at, '{y}-{m}-{d}')
            ele.updated_at = parseTime(ele.updated_at, '{y}-{m}-{d}')
            ele.canGetDataDate = parseTime(ele.canGetDataDate, '{y}-{m}-{d}')
            this.sel_options.push({
              label: ele.entName,
              value: ele.entName
            })
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
    },
    createZip() {
      this.$http.post('admin_provide/v1/invoice/createZip', {
        'zip_arr': this.multipleSelection
      }).then(({
        data: res
      }) => {
        if (res.result.length > 5) {
          window.location.href = 'https://api.meirixindong.com/Static/Temp/' + res.result + '.zip'
          this.getIndex()
        } else {
          this.$message.success('未发现未发送的企业')
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    createGetDataTime() {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('未选择企业')
      } else {
        this.$confirm('确定更改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('admin_provide/v1/invoice/createGetDataTime', {
            'ent_arr': this.multipleSelection
          }).then(({
            data: res
          }) => {
            this.getIndex()
          }).catch((err) => {
            console.error(err)
          })
        }).catch(() => {
        })
      }
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
