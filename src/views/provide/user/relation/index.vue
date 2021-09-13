<template>
  <div>
    <el-col>
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
    </el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="path" label="路径" width="350"></el-table-column>
      <el-table-column prop="name" label="名称" width="300"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="price" label="成本价" width="100"></el-table-column>
      <el-table-column prop="custPrice" label="用户价" width="100"></el-table-column>
      <el-table-column prop="source" label="数据源" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="接口id" :label-width="formLabelWidth">
          <el-input disabled v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth">
          <el-input disabled v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input disabled v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input disabled v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="成本价" :label-width="formLabelWidth">
          <el-input disabled v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="用户价" :label-width="formLabelWidth">
          <el-input v-model="form.custPrice"></el-input>
        </el-form-item>
        <el-form-item label="数据源" :label-width="formLabelWidth">
          <el-input disabled v-model="form.source"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditBtn">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        'id': '',
        'path': '',
        'name': '',
        'desc': '',
        'price': '',
        'custPrice': '',
        'source': '',
      },
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
    handleSelectChange(id) {
      this.$http.post('admin_provide/v1/user/getUserApi', { id }).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.tableData = res.result
          this.tableData.forEach((item) => {
            item.custPrice = Number(item.custPrice)
            item.price = Number(item.price)
          })
          this.formInline.uid = id
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
    handleEdit(rowData) {
      this.dialogFormVisible = true
      this.form.id = rowData.id
      this.form.path = rowData.path
      this.form.name = rowData.name
      this.form.desc = rowData.desc
      this.form.price = rowData.price
      this.form.custPrice = rowData.custPrice
      this.form.source = rowData.source
    },
    handleEditBtn() {
      this.$http.post('admin_provide/v1/user/editUserApiPrice',{
        uid: this.formInline.uid,
        aid: this.form.id,
        price: this.form.custPrice
      }).then(({
        data: res
      }) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.dialogFormVisible = false
        location.reload()
      }).catch((err) => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
