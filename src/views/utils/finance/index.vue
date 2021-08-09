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
            <el-button
              class="transfer-footer"
              slot="left-footer"
              size="small"
              @click="inputOneDialog = true">添加企业
            </el-button>
          </el-transfer>
        </div>
      </div>
      <div class="header-right">
        <div class="checkbox-wrapper">
          <el-radio v-model="CkRange" label="1" border class="checkbox-item mg-t-15">脱敏值</el-radio>
          <el-radio v-model="CkRange" label="2" border class="checkbox-item mg-t-15">区间1</el-radio>
          <el-radio v-model="CkRange" label="3" border class="checkbox-item mg-t-15">区间2</el-radio>
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
      <div class="middle-content-3">
        <div>
          <div style="font-size: 14px;margin-bottom: 15px">单个企业价格</div>
          <el-select v-model="payOneMoneyValue" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in payOneMoney"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
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
        height="600"
        border
        style="width: 100%">
        <el-table-column fixed width="150" align="center" prop="ENTNAME" label="企业名称"></el-table-column>
        <el-table-column fixed width="80" align="center" prop="YEAR" label="数据年份"></el-table-column>
        <el-table-column width="150" align="center" prop="ASSGRO" label="资产总额"></el-table-column>
        <el-table-column width="150" align="center" prop="LIAGRO" label="负债总额"></el-table-column>
        <el-table-column width="150" align="center" prop="VENDINC" label="营业总收入"></el-table-column>
        <el-table-column width="150" align="center" prop="MAIBUSINC" label="主营业务收入"></el-table-column>
        <el-table-column width="150" align="center" prop="PROGRO" label="利润总额"></el-table-column>
        <el-table-column width="150" align="center" prop="NETINC" label="净利润"></el-table-column>
        <el-table-column width="150" align="center" prop="RATGRO" label="纳税总额"></el-table-column>
        <el-table-column width="150" align="center" prop="TOTEQU" label="所有者权益"></el-table-column>
        <el-table-column width="150" align="center" prop="SOCNUM" label="社保人数"></el-table-column>
        <el-table-column width="150" align="center" prop="C_ASSGROL" label="净资产"></el-table-column>
        <el-table-column width="150" align="center" prop="A_ASSGROL" label="平均资产总额"></el-table-column>
        <el-table-column width="150" align="center" prop="CA_ASSGRO" label="平均净资产"></el-table-column>
        <el-table-column width="150" align="center" prop="A_VENDINCL" label="企业人均产值"></el-table-column>
        <el-table-column width="150" align="center" prop="A_PROGROL" label="企业人均盈利"></el-table-column>
        <el-table-column width="150" align="center" prop="C_INTRATESL" label="净利率"></el-table-column>
        <el-table-column width="150" align="center" prop="ATOL" label="资产周转率"></el-table-column>
        <el-table-column width="150" align="center" prop="ASSGRO_C_INTRATESL" label="总资产净利率"></el-table-column>
        <el-table-column width="150" align="center" prop="ROAL" label="总资产回报率"></el-table-column>
        <el-table-column width="150" align="center" prop="ROE_AL" label="净资产回报率A"></el-table-column>
        <el-table-column width="150" align="center" prop="ROE_BL" label="净资产回报率B"></el-table-column>
        <el-table-column width="150" align="center" prop="DEBTL" label="资产负债率"></el-table-column>
        <el-table-column width="150" align="center" prop="EQUITYL" label="权益乘数"></el-table-column>
        <el-table-column width="150" align="center" prop="MAIBUSINC_RATIOL" label="主营业务比率"></el-table-column>
        <el-table-column width="150" align="center" prop="NALR" label="净资产负债率"></el-table-column>
        <el-table-column width="150" align="center" prop="OPM" label="营业利润率"></el-table-column>
        <el-table-column width="150" align="center" prop="ROCA" label="资本保值增值率"></el-table-column>
        <el-table-column width="150" align="center" prop="NOR" label="营业净利率"></el-table-column>
        <el-table-column width="150" align="center" prop="PMOTA" label="总资产利润率"></el-table-column>
        <el-table-column width="150" align="center" prop="TBR" label="税收负担率"></el-table-column>
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
    <el-dialog
      title=""
      :visible.sync="inputOneDialog"
      width="30%">
      <el-form label-width="80px">
        <el-form-item label="企业名称">
          <el-input v-model="inputOneValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addOne">添加</el-button>
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
      payOneMoneyValue: 0,
      uploadUrl: 'https://api.meirixindong.com/admin_provide/v1/finance/uploadEntList',
      tableData: [],
      payEntValue: '',
      payEnt: [],
      payUserValue: '',
      payUser: [],
      uploadDialog: false,
      inputOneDialog: false,
      inputOneValue: '',
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      CkRange: '1'
    }
  },
  computed: {
    payOneMoney() {
      let tmp = []
      for (let i = 0; i <= 100; i++) {
        tmp.push({
          label: i,
          value: i
        })
      }
      return tmp
    }
  },
  mounted() {
    this.getIndex()
  },
  methods: {
    addOne() {
      if (this.inputOneValue.trim().length > 3) {
        this.data.push({
          label: this.inputOneValue.trim(),
          key: this.inputOneValue.trim(),
          pinyin: 'xxx'
        })
      }
      this.inputOneValue = ''
      this.inputOneDialog = false
    },
    downFinanceFile() {
      window.location.href = 'https://api.meirixindong.com/Static/financeUploadModel.csv'
    },
    exportDataBtn() {
      if (this.value.length <= 0) {
        this.$message.warning('导出列表是空')
        return
      }
      if (this.value.length > 15) {
        this.$message.warning('每次导出最大15家企业')
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
        entList: JSON.stringify(this.value),
        money: this.payOneMoneyValue * this.value.length,
        CkRange: this.CkRange
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
  width: 300px;
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
    display: flex;
    align-items: center;
    justify-content: center;
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
