<template>
  <div>
    <div class="search-cond-wrapper">
      <div class="search-left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="用户名称">
            <el-select
              v-model="form.username"
              filterable
              clearable
              @change="username_change"
              :style="{width:'300px'}">
              <el-option
                v-for="item in form.user_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口名称">
            <el-select
              v-model="form.apiname"
              filterable
              clearable
              @change="apiname_change"
              :loading="loading"
              :style="{width:'300px'}">
              <el-option
                v-for="item in form.api_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              :style="{width:'300px'}"
              value-format="yyyy-MM-dd"
              @change="date_change"
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="export_csv">立即导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search-right">
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="400">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求uuid">
              <span>{{ props.row.requestId }}</span>
            </el-form-item>
            <el-form-item label="消耗时间">
              <span>{{ Number(props.row.spendTime) }} s</span>
            </el-form-item>
            <el-form-item label="请求ip">
              <span>{{ props.row.requestIp }}</span>
            </el-form-item>
            <el-form-item label="请求ip详情">
              <span>{{ props.row.ipDetail.disp }}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <el-button type="primary" size="mini" @click="handleRespDetail(props.row.requestData)">查看详情</el-button>
            </el-form-item>
            <el-form-item label="返回数据">
              <el-button type="primary" size="mini" @click="handleRespDetail(props.row.responseData)">查看详情</el-button>
            </el-form-item>
            <el-form-item label="成本价格">
              <span>{{ Number(props.row.price) }} 元</span>
            </el-form-item>
            <el-form-item label="支付金额">
              <span>{{ Number(props.row.spendMoney) }} 元</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="接口路径" prop="path" width="350px"></el-table-column>
      <el-table-column label="接口名称" prop="name"></el-table-column>
      <el-table-column label="接口描述" prop="desc"></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column label="请求时间" prop="created_at"></el-table-column>
      <el-table-column label="返回值" prop="responseCode"></el-table-column>
    </el-table>
    <div class="my-paginate">
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :current-page="elPagination.page"
        :page-size="elPagination.pageSize"
        :total="elPagination.total">
      </el-pagination>
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
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      multipleSelection: [],
      form: {
        username: '',
        user_options: [],
        apiname: '',
        api_options: [],
        date: '',
        uid: '',
        aid: ''
      },
      date: '',
      tableData: [],
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
    export_csv() {
      this.$http.post('admin_provide/v1/statistics/exportCsv', this.form).then(({
        data: res
      }) => {
        window.location.href = 'https://api.meirixindong.com/Static/Temp/' + res.result.filename
      }).catch((err) => {

      })
    },
    date_change() {
      this.form.date = this.date[0] + '|||' + this.date[1]
      this.pageChange(1)
    },
    handleRespDetail(resp) {
      this.dialogVisible = true
      this.jsonData = JSON.parse(resp)
    },
    pageChange(index) {
      let obj = this.form
      obj.page = index
      obj.pageSize = this.elPagination.pageSize
      this.$http.post('admin_provide/v1/statistics/getStatisticsList', obj).then(({
        data: res
      }) => {
        this.tableData = res.result
        this.tableData.forEach((item) => {
          item.created_at = parseTime(item.created_at)
        })
        this.elPagination.total = res.paging.total
        //ext里的
        this.form.user_options = []
        res.ext.user_info.forEach(ele => {
          this.form.user_options.push({
            label: ele.username,
            value: ele.id
          })
        })
        this.form.api_options = []
        res.ext.api_info.forEach(ele => {
          this.form.api_options.push({
            label: ele.name + ' - ' + ele.source,
            value: ele.id
          })
        })
      }).catch((err) => {

      })
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    username_change(index) {
      this.form.uid = index
      this.pageChange(1)
    },
    apiname_change(index) {
      this.form.aid = index
      this.pageChange(1)
    }
  }
}
</script>

<style lang="scss" scoped>

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand ::v-deep label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.search-cond-wrapper {
  margin-top: 14px;
  border-bottom: 1px solid #EBEEF5;
  width: 100%;
  display: flex;

  .search-left {
    width: 50%;
  }

  .search-right {
    flex: 1;
  }
}

.my-paginate {
  width: 100%;
  height: 100px;
  line-height: 100px;
  margin-top: 20px;
  text-align: center;
}

</style>
