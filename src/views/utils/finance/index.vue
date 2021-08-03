<template>
  <div>
    <div class="header-wrapper">
      <div class="header-left">
        <div class="transfer-wrapper">
          <el-transfer
            :titles="['上传列表', '导出列表']"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="拼音"
            v-model="value"
            :data="data">
            <el-button
              class="transfer-footer"
              slot="left-footer"
              size="small"
              @click="uploadDialog = true">上传名单
            </el-button>
          </el-transfer>
        </div>
      </div>
      <div class="header-right">
        <div class="checkbox-wrapper">
          <el-checkbox label="原值" border class="checkbox-item mg-t-15"></el-checkbox>
          <el-checkbox label="区间" border class="checkbox-item mg-t-15"></el-checkbox>
        </div>
      </div>
    </div>
    <div class="middle-wrapper">
      <div class="middle-content-1">
        <div>
          <div style="font-size: 14px;margin-bottom: 15px">选择扣费 个人 用户</div>
          <el-select v-model="payUserValue" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in payUser"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="middle-content-2">
        <div>
          <div style="font-size: 14px;margin-bottom: 15px">选择扣费 企业 用户</div>
          <el-select v-model="payEntValue" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in payEnt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="middle-content-3"></div>
      <div class="middle-content-4"></div>
    </div>
    <div class="btn-wrapper">
      <div>
        <el-button type="primary" round @click="exportDataBtn">导出</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        height="500"
        border
        style="width: 100%">
        <el-table-column align="center" prop="YEAR" label="数据年份"></el-table-column>
        <el-table-column align="center" prop="ENTNAME" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="VENDINC" label="营业总收入"></el-table-column>
        <el-table-column align="center" prop="ASSGRO" label="资产总额"></el-table-column>
        <el-table-column align="center" prop="LIAGRO" label="负债总额"></el-table-column>
        <el-table-column align="center" prop="RATGRO" label="纳税总额"></el-table-column>
        <el-table-column align="center" prop="MAIBUSINC" label="主营业务收入"></el-table-column>
        <el-table-column align="center" prop="TOTEQU" label="所有者权益"></el-table-column>
        <el-table-column align="center" prop="PROGRO" label="利润总额"></el-table-column>
        <el-table-column align="center" prop="NETINC" label="净利润"></el-table-column>
        <el-table-column align="center" prop="SOCNUM" label="社保人数"></el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="上传 模版 文件"
      :visible.sync="uploadDialog"
      width="30%">
      <el-upload
        class="upload-demo"
        drag
        :on-success="uploadSuccess"
        :action="uploadUrl"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能处理 模版 文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="downFinanceFile">下载模版</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      uploadUrl: 'https://api.meirixindong.com/admin_provide/v1/finance/uploadEntList',
      tableData: [],
      payEntValue: '',
      payEnt: [],
      payUserValue: '',
      payUser: [],
      uploadDialog: false,
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  computed: {},
  mounted() {
    this.getIndex()
  },
  methods: {
    downFinanceFile() {
      window.location.href = 'https://api.meirixindong.com/Static/financeUploadModel.csv'
    },
    exportDataBtn() {
      if (this.value.length <= 0) {
        this.$message.warning('导出列表是空')
        return
      }
      if (this.payEntValue.length > 0 && this.payUserValue > 0) {
        this.$message.warning('付费对象只能有一个')
        return
      }
      if (this.payEntValue.length <= 0 && this.payUserValue <= 0) {
        this.$message.warning('付费对象必须有一个')
        return
      }
      //发送请求
      let obj = {
        payEntValue: this.payEntValue,
        payUserValue: this.payUserValue,
        entList: JSON.stringify(this.value)
      }
      this.$http.post('admin_provide/v1/finance/getFinanceData', obj).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.tableData = res.result.list
          window.location.href = 'https://api.meirixindong.com/Static/Temp/' + res.result.file
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    uploadSuccess(response, file, fileList) {
      this.uploadDialog = false
      this.data = []
      response.result.forEach(ele => {
        this.data.push({
          label: ele.name,
          key: ele.name,
          pinyin: ele.pinyin
        })
      })
    },
    getIndex() {
      let obj = {
        id: 1
      }
      this.$http.post('admin_provide/v1/finance/getIndex', obj).then(({
        data: res
      }) => {
        this.payEnt = []
        this.payUser = []
        res.result.entUserList.forEach(ele => {
          this.payEnt.push({
            label: ele.username + ' 余额: ' + ele.money,
            value: ele.appId
          })
        })
        res.result.userList.forEach(ele => {
          this.payUser.push({
            label: ele.username + ' - ' + ele.phone + ' - ' + ele.company,
            value: ele.phone
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-transfer-panel {
  width: 300px !important;
}

.header-wrapper {
  width: 100%;
  height: 400px;
  display: flex;
  border-bottom: 1px solid #EBEEF5;

  .header-left {
    width: 75%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #EBEEF5;

    .transfer-wrapper {
      display: flex;
      flex-direction: column;

      .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
      }
    }
  }

  .header-right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .checkbox-wrapper {
      .checkbox-item {
        display: block;
        margin-left: 0;
        margin-right: 0
      }

      .mg-t-15 {
        margin-top: 15px;
      }
    }
  }
}

.middle-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #EBEEF5;

  .middle-content-1 {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #EBEEF5;
  }

  .middle-content-2 {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #EBEEF5;
  }

  .middle-content-3 {
    width: 25%;
    height: 100%;
    border-right: 1px solid #EBEEF5;
  }

  .middle-content-4 {
    width: 25%;
    height: 100%;
  }
}

.btn-wrapper {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-wrapper {

}
</style>
