<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="企业/用户">
        <el-select v-model="formInline.name" placeholder="企业/用户" @change="handleSelectChange">
          <el-option v-for="(item,index) in userData"
                     :key="index"
                     :label="item.username"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @select-all="handleSelectionChange" @select="handleSelectionChange" ref="fileTable">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="path" label="路径" width="400"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
<!--      <el-table-column prop="source" label="数据源"></el-table-column>-->
    </el-table>
  </div>
</template>

<script>
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
      formInline: {
        name: '',
        uid: ''
      },
      tableData: [],
      userData: [],
      apiData: [],
      multipleSelection: []
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.$http.post('admin_provide/v1/user/getUserList', {}).then(({
      data: res
    }) => {
      if (res.code === 200) {
        this.userData = res.result
        this.formInline.name = this.userData.slice(0, 1)[0].username
        this.formInline.uid = this.userData.slice(0, 1)[0].id
        this.handleSelectChange(this.formInline.uid)
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    }).catch((err) => {
      console.error(err)
    })
    this.$http.post('admin_provide/v1/api/getApiList', {}).then(({
      data: res
    }) => {
      if (res.code === 200) {
        this.apiData = res.result
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
  // beforeCreate() {
  // },
  created() {
  },
  beforeMount() {
  },
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
    handleSelectChange(id) {
      this.$http.post('admin_provide/v1/user/getUserApi', { id }).then(({
        data: res
      }) => {
        if (res.code === 200) {
          let tmp = res.result
          tmp.forEach((item) => {
            item.custPrice = Number(item.custPrice)
            item.price = Number(item.price)
          })
          this.formInline.uid = id
          this.handleTableData(tmp)
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
    handleTableData(data) {
      this.multipleSelection = []
      let tmp = []
      data.forEach((userItem) => {
        tmp.push(userItem.apiId)
      })
      this.tableData.forEach((listItem, index) => {
        if (tmp.indexOf(listItem.id) > -1) {
          this.$refs.fileTable.toggleRowSelection(this.tableData[index], true)
        } else {
          this.$refs.fileTable.toggleRowSelection(this.tableData[index], false)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$http.post('admin_provide/v1/user/editUserApi', {
        'uid': this.formInline.uid,
        'apiInfo': this.multipleSelection
      }).then(({
        data: res
      }) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
