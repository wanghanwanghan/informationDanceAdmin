<template>
  <div>
    <div class="upload-wrapper">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :on-success="uploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传zip文件</div>
      </el-upload>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column align="center" prop="file_name" label="文件名" width="500"></el-table-column>
        <el-table-column align="center" prop="file_c_time" label="上传时间"></el-table-column>
        <el-table-column align="center" prop="file_size_kb" label="大小 Kb"></el-table-column>
        <el-table-column align="center" prop="file_size_mb" label="大小 Mb"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click.native.stop="downloadFile(scope.$index, scope.row)">下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      uploadUrl: 'https://api.meirixindong.com/admin_provide/v1/transmission/uploadFileToDir'
    }
  },
  computed: {},
  mounted() {
    this.getIndex()
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.getIndex()
    },
    downloadFile(index, row) {
      window.location.href = 'https://api.meirixindong.com/Static/Temp/' + row.file_name
    },
    getIndex() {
      this.$http.post('admin_provide/v1/transmission/getFileList', {}).then(({
        data: res
      }) => {
        if (res.code === 200) {
          res.result.forEach(ele => {
            ele.file_c_time = parseTime(ele.file_c_time, '{y}-{m}-{d} {h}:{i}:{s}')
          })
          this.tableData = res.result
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-wrapper {
  text-align: center;
  border-bottom: 1px solid #EBEEF5;
}

.table-wrapper {
}
</style>
