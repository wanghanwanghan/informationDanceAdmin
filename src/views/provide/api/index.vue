<template>
  <div>
    <el-row>
      <el-button type="text" @click="dialogFormVisible = true" class="addUserBtn-class">添加api</el-button>
      <el-dialog title="添加api" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.path"></el-input>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="数据源" :label-width="formLabelWidth">
            <el-select v-model="form.source" placeholder="请选择数据源">
              <el-option label="企查查" value="企查查"></el-option>
              <el-option label="天眼查" value="天眼查"></el-option>
              <el-option label="淘数" value="淘数"></el-option>
              <el-option label="法海" value="法海"></el-option>
              <el-option label="乾启" value="乾启"></el-option>
              <el-option label="信动" value="信动"></el-option>
              <el-option label="元素" value="元素"></el-option>
              <el-option label="众望" value="众望"></el-option>
              <el-option label="云码通" value="云码通"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成本（元）" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="api文档" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo upload-ext"
              ref="upload"
              action="https://api.meirixindong.com/api/v1/comm/file/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddApi">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-table
      :data="tableData"
      :highlight-current-row="true"
      border
      style="width: 100%">
      <el-table-column prop="path" label="地址" width="350"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>
      <el-table-column prop="desc" label="描述" width="200"></el-table-column>
<!--      <el-table-column prop="source" label="数据源" width="100"></el-table-column>-->
      <el-table-column prop="price" label="成本（元）" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="65"></el-table-column>
      <el-table-column prop="apiDoc" label="文档" width="65">
        <template slot-scope="scope">
          <a @click="handleCellClick(scope.row)" class="api-doc-cell-class">{{ scope.row.apiDoc }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-dialog title="" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
              <el-form-item label="接口id" :label-width="formLabelWidth">
                <el-input disabled v-model="form2.id"></el-input>
              </el-form-item>
              <el-form-item label="路径" :label-width="formLabelWidth">
                <el-input v-model="form2.path"></el-input>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form2.name"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="form2.desc"></el-input>
              </el-form-item>
              <el-form-item label="成本价" :label-width="formLabelWidth">
                <el-input v-model="form2.price"></el-input>
              </el-form-item>
              <el-form-item label="状态" :label-width="formLabelWidth">
                <el-select v-model="form2.status" placeholder="请选择状态">
                  <el-option label="启用" value="启用"></el-option>
                  <el-option label="停用" value="停用"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据源" :label-width="formLabelWidth">
                <el-input disabled v-model="form2.source"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input disabled v-model="form2.created_at"></el-input>
              </el-form-item>
              <el-form-item label="修改时间" :label-width="formLabelWidth">
                <el-input disabled v-model="form2.updated_at"></el-input>
              </el-form-item>
              <el-form-item label="api文档" :label-width="formLabelWidth">
                <el-input disabled v-model="form2.apiDoc"></el-input>
                <el-upload
                  class="upload-demo upload-ext"
                  ref="upload2"
                  action="https://api.meirixindong.com/api/v1/comm/file/upload"
                  :on-preview="handlePreview2"
                  :on-remove="handleRemove2"
                  :on-success="handleSuccess2"
                  :file-list="fileList2"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">上传到服务器
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="handleEditBtn">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import fileDownload from 'js-file-download'
import Axios from 'axios'

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
      dialogFormVisible: false,
      form: {
        path: '',
        name: '',
        desc: '',
        source: '',
        price: '',
        apiDoc: ''
      },
      formLabelWidth: '120px',
      form2: {
        'id': '',
        'path': '',
        'name': '',
        'desc': '',
        'price': '',
        'source': '',
        'status': '',
        'apiDoc': '',
        'created_at': '',
        'updated_at': ''
      },
      dialogFormVisible2: false,
      fileList: [],
      fileList2: []
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    let obj = {}
    this.$http.post('admin_provide/v1/api/getApiList', obj).then(({
      data: res
    }) => {
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.tableData = this.handleApiInfo(res.result)
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
    handleCellClick(row) {
      if (row.apiDocUrl.length > 10) {
        Axios({
          method: 'get',
          url: 'https://api.meirixindong.com' + row.apiDocUrl,
          responseType: 'blob'
        }).then(res => {
          let index = row.apiDocUrl.lastIndexOf('.')
          let suffix = row.apiDocUrl.substr(index + 1)
          fileDownload(res.data, row.name + '.' + suffix)
        })
      }
    },
    handleEdit(rowData) {
      this.dialogFormVisible2 = true
      this.form2.id = rowData.id
      this.form2.path = rowData.path
      this.form2.name = rowData.name
      this.form2.desc = rowData.desc
      this.form2.price = rowData.price
      this.form2.source = rowData.source
      this.form2.status = rowData.status
      this.form2.apiDoc = rowData.apiDocUrl
      this.form2.created_at = rowData.created_at
      this.form2.updated_at = parseTime(rowData.updated_at)
    },
    handleEditBtn() {
      this.dialogFormVisible2 = false
      this.$http.post('admin_provide/v1/api/editApi', {
        aid: this.form2.id,
        path: this.form2.path,
        name: this.form2.name,
        desc: this.form2.desc,
        price: this.form2.price,
        status: this.form2.status,
        apiDoc: this.form2.apiDoc
      }).then(({ data: res }) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        location.reload()
      }).catch((err) => {

      })
    },
    handleApiInfo(rel) {
      rel.forEach(item => {
        item.status === 1 ? item.status = '启用' : item.status = '停用中'
        item.apiDocUrl = item.apiDoc
        item.apiDoc.length > 10 ? item.apiDoc = '下载' : item.apiDoc = '未上传'
        item.price = Number(item.price)
        item.created_at = parseTime(item.created_at, '{y}-{m}-{d}')
      })
      return rel
    },
    handleAddApi() {
      if (this.form.path === '' || this.form.name === '' ||
        this.form.source === '' || this.form.price === '' || this.form.apiDoc === '') {
        this.$message({
          type: 'error',
          message: '信息填写不完整'
        })
        return
      }
      let obj = {
        'path': this.form.path,
        'name': this.form.name,
        'desc': this.form.desc,
        'source': this.form.source,
        'price': this.form.price,
        'apiDoc': this.form.apiDoc
      }
      this.$http.post('admin_provide/v1/api/addApi', obj).then(({
        data: res
      }) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch((err) => {
        console.error(err)
      })
      this.dialogFormVisible = false
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.fileList = []
    },
    handlePreview(file) {
    },
    handleSuccess(resp, file, fileList) {
      if (resp.code === 200) {
        this.form.apiDoc = resp.result.file
      }
    },
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    handleRemove2(file, fileList) {
      this.fileList2 = []
    },
    handlePreview2(file) {
    },
    handleSuccess2(resp, file, fileList) {
      if (resp.code === 200) {
        this.form2.apiDoc = resp.result.file
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addUserBtn-class {
  padding-left: 10px;
}

.upload-ext {
  width: 40%;
}

.api-doc-cell-class {
  cursor: default;
}
</style>
