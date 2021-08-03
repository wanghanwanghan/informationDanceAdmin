(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74834516"],{"9d28":function(t,e,a){"use strict";a("a355")},a355:function(t,e,a){},da1b:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"header-wrapper"},[a("div",{staticClass:"header-left"},[a("div",{staticClass:"transfer-wrapper"},[a("el-transfer",{attrs:{titles:["上传列表","导出列表"],filterable:"","filter-method":t.filterMethod,"filter-placeholder":"拼音",data:t.data},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-button",{staticClass:"transfer-footer",attrs:{slot:"left-footer",size:"small"},on:{click:function(e){t.uploadDialog=!0}},slot:"left-footer"},[t._v("上传名单 ")])],1)],1)]),a("div",{staticClass:"header-right"},[a("div",{staticClass:"checkbox-wrapper"},[a("el-checkbox",{staticClass:"checkbox-item mg-t-15",attrs:{label:"原值",border:""}}),a("el-checkbox",{staticClass:"checkbox-item mg-t-15",attrs:{label:"区间",border:""}})],1)])]),a("div",{staticClass:"middle-wrapper"},[a("div",{staticClass:"middle-content-1"},[a("div",[a("div",{staticStyle:{"font-size":"14px","margin-bottom":"15px"}},[t._v("选择扣费 个人 用户")]),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.payUserValue,callback:function(e){t.payUserValue=e},expression:"payUserValue"}},t._l(t.payUser,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)]),a("div",{staticClass:"middle-content-2"},[a("div",[a("div",{staticStyle:{"font-size":"14px","margin-bottom":"15px"}},[t._v("选择扣费 企业 用户")]),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.payEntValue,callback:function(e){t.payEntValue=e},expression:"payEntValue"}},t._l(t.payEnt,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)]),a("div",{staticClass:"middle-content-3"}),a("div",{staticClass:"middle-content-4"})]),a("div",{staticClass:"btn-wrapper"},[a("div",[a("el-button",{attrs:{type:"primary",round:""},on:{click:t.exportDataBtn}},[t._v("导出")])],1)]),a("div",{staticClass:"table-wrapper"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,height:"500",border:""}},[a("el-table-column",{attrs:{align:"center",prop:"YEAR",label:"数据年份"}}),a("el-table-column",{attrs:{align:"center",prop:"ENTNAME",label:"企业名称"}}),a("el-table-column",{attrs:{align:"center",prop:"VENDINC",label:"营业总收入"}}),a("el-table-column",{attrs:{align:"center",prop:"ASSGRO",label:"资产总额"}}),a("el-table-column",{attrs:{align:"center",prop:"LIAGRO",label:"负债总额"}}),a("el-table-column",{attrs:{align:"center",prop:"RATGRO",label:"纳税总额"}}),a("el-table-column",{attrs:{align:"center",prop:"MAIBUSINC",label:"主营业务收入"}}),a("el-table-column",{attrs:{align:"center",prop:"TOTEQU",label:"所有者权益"}}),a("el-table-column",{attrs:{align:"center",prop:"PROGRO",label:"利润总额"}}),a("el-table-column",{attrs:{align:"center",prop:"NETINC",label:"净利润"}}),a("el-table-column",{attrs:{align:"center",prop:"SOCNUM",label:"社保人数"}})],1)],1),a("el-dialog",{attrs:{title:"上传 模版 文件",visible:t.uploadDialog,width:"30%"},on:{"update:visible":function(e){t.uploadDialog=e}}},[a("el-upload",{staticClass:"upload-demo",attrs:{drag:"","on-success":t.uploadSuccess,action:t.uploadUrl,multiple:""}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),a("em",[t._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能处理 模版 文件")])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.downFinanceFile}},[t._v("下载模版")])],1)],1)],1)},i=[],n=(a("4160"),a("c975"),a("b0c0"),a("159b"),{name:"",components:{},props:{},data:function(){return{uploadUrl:"https://api.meirixindong.com/admin_provide/v1/finance/uploadEntList",tableData:[],payEntValue:"",payEnt:[],payUserValue:"",payUser:[],uploadDialog:!1,data:[],value:[],filterMethod:function(t,e){return e.pinyin.indexOf(t)>-1}}},computed:{},mounted:function(){this.getIndex()},methods:{downFinanceFile:function(){window.location.href="https://api.meirixindong.com/Static/financeUploadModel.csv"},exportDataBtn:function(){var t=this;if(this.value.length<=0)this.$message.warning("导出列表是空");else if(this.payEntValue.length>0&&this.payUserValue>0)this.$message.warning("付费对象只能有一个");else if(this.payEntValue.length<=0&&this.payUserValue<=0)this.$message.warning("付费对象必须有一个");else{var e={payEntValue:this.payEntValue,payUserValue:this.payUserValue,entList:JSON.stringify(this.value)};this.$http.post("admin_provide/v1/finance/getFinanceData",e).then((function(e){var a=e.data;200===a.code&&(t.tableData=a.result.list,window.location.href="https://api.meirixindong.com/Static/Temp/"+a.result.file)})).catch((function(t){console.log(t)}))}},uploadSuccess:function(t,e,a){var l=this;this.uploadDialog=!1,this.data=[],t.result.forEach((function(t){l.data.push({label:t.name,key:t.name,pinyin:t.pinyin})}))},getIndex:function(){var t=this,e={id:1};this.$http.post("admin_provide/v1/finance/getIndex",e).then((function(e){var a=e.data;t.payEnt=[],t.payUser=[],a.result.entUserList.forEach((function(e){t.payEnt.push({label:e.username+" 余额: "+e.money,value:e.appId})})),a.result.userList.forEach((function(e){t.payUser.push({label:e.username+" - "+e.phone+" - "+e.company,value:e.phone})}))})).catch((function(t){console.log(t)}))}}}),s=n,o=(a("9d28"),a("2877")),r=Object(o["a"])(s,l,i,!1,null,"6b616738",null);e["default"]=r.exports}}]);