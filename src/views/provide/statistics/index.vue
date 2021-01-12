<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
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
      width="30%"
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
  // filters: {},
  props: {},
  // provide() {
  //   return {}
  // },
  data() {
    return {
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
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.pageChange(1)
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
    handleRespDetail(resp) {
      this.dialogVisible = true
      this.jsonData = JSON.parse(resp)
    },
    pageChange(index) {
      let obj = {
        page: index,
        pageSize: this.elPagination.pageSize
      }
      this.$http.post('admin_provide/v1/statistics/getStatisticsList', obj).then(({
        data: res
      }) => {
        this.tableData = res.result
        this.tableData.forEach((item) => {
          item.created_at = parseTime(item.created_at)
        })
        this.elPagination.total = res.paging.total
      }).catch((err) => {

      })
    },
    handleClose(done) {
      this.dialogVisible = false
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

.my-paginate {
  width: 100%;
  height: 100px;
  line-height: 100px;
  margin-top: 20px;
  text-align: center;
}

</style>
