(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e975af4"],{"06d7":function(e,t,l){},6387:function(e,t,l){"use strict";l("06d7")},da1b:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",{staticClass:"header-wrapper"},[l("div",{staticClass:"header-left"},[l("div",{staticClass:"transfer-wrapper"},[l("el-transfer",{attrs:{titles:["上传列表","导出列表"],filterable:"","filter-method":e.filterMethod,"filter-placeholder":"拼音",data:e.data},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[l("el-button",{staticClass:"transfer-footer",attrs:{slot:"left-footer",size:"small"},on:{click:function(t){e.uploadDialog=!0}},slot:"left-footer"},[e._v("上传名单 ")]),l("el-button",{staticClass:"transfer-footer",attrs:{slot:"left-footer",size:"small"},on:{click:function(t){e.inputOneDialog=!0}},slot:"left-footer"},[e._v("添加企业 ")])],1)],1)]),l("div",{staticClass:"header-right"},[l("div",{staticClass:"checkbox-wrapper"},[l("el-radio",{staticClass:"checkbox-item mg-t-15",attrs:{label:"1",border:""},model:{value:e.CkRange,callback:function(t){e.CkRange=t},expression:"CkRange"}},[e._v("脱敏值")]),l("el-radio",{staticClass:"checkbox-item mg-t-15",attrs:{label:"2",border:""},model:{value:e.CkRange,callback:function(t){e.CkRange=t},expression:"CkRange"}},[e._v("区间1")]),l("el-radio",{staticClass:"checkbox-item mg-t-15",attrs:{label:"3",border:""},model:{value:e.CkRange,callback:function(t){e.CkRange=t},expression:"CkRange"}},[e._v("区间2")]),l("el-radio",{staticClass:"checkbox-item mg-t-15",attrs:{label:"4",border:""},model:{value:e.CkRange,callback:function(t){e.CkRange=t},expression:"CkRange"}},[e._v("永泰")])],1)])]),l("div",{staticClass:"middle-wrapper"},[l("div",{staticClass:"middle-content-1"},[l("div",[l("div",{staticStyle:{"font-size":"14px","margin-bottom":"15px"}},[e._v("选择扣费 个人 用户")]),l("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.payUserValue,callback:function(t){e.payUserValue=t},expression:"payUserValue"}},e._l(e.payUser,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),l("div",{staticClass:"middle-content-2"},[l("div",[l("div",{staticStyle:{"font-size":"14px","margin-bottom":"15px"}},[e._v("选择扣费 企业 用户")]),l("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.payEntValue,callback:function(t){e.payEntValue=t},expression:"payEntValue"}},e._l(e.payEnt,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),l("div",{staticClass:"middle-content-3"},[l("div",[l("div",{staticStyle:{"font-size":"14px","margin-bottom":"15px"}},[e._v("单个企业价格")]),l("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.payOneMoneyValue,callback:function(t){e.payOneMoneyValue=t},expression:"payOneMoneyValue"}},e._l(e.payOneMoney,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),l("div",{staticClass:"middle-content-4"})]),l("div",{staticClass:"btn-wrapper"},[l("div",[l("el-button",{attrs:{type:"primary",round:""},on:{click:e.exportDataBtn}},[e._v("导出")])],1)]),l("div",{staticClass:"table-wrapper"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"600",border:""}},[l("el-table-column",{attrs:{fixed:"",width:"150",align:"center",prop:"ENTNAME",label:"企业名称"}}),l("el-table-column",{attrs:{fixed:"",width:"80",align:"center",prop:"YEAR",label:"数据年份"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ASSGRO",label:"资产总额"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"LIAGRO",label:"负债总额"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"VENDINC",label:"营业总收入"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"MAIBUSINC",label:"主营业务收入"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"PROGRO",label:"利润总额"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"NETINC",label:"净利润"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"RATGRO",label:"纳税总额"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"TOTEQU",label:"所有者权益"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"SOCNUM",label:"社保人数"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"C_ASSGROL",label:"净资产"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"A_ASSGROL",label:"平均资产总额"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"CA_ASSGRO",label:"平均净资产"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"A_VENDINCL",label:"企业人均产值"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"A_PROGROL",label:"企业人均盈利"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"C_INTRATESL",label:"净利率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ATOL",label:"资产周转率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ASSGRO_C_INTRATESL",label:"总资产净利率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ROAL",label:"总资产回报率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ROE_AL",label:"净资产回报率A"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"DEBTL",label:"资产负债率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"EQUITYL",label:"权益乘数"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"NALR",label:"净资产负债率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ROCA",label:"资本保值增值率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"NOR",label:"营业净利率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"PMOTA",label:"总资产利润率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"TBR",label:"税收负担率"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"ASSGRO_yoy",label:"资产总额同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"LIAGRO_yoy",label:"负债总额同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"VENDINC_yoy",label:"营业总收入同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"MAIBUSINC_yoy",label:"主营业务收入同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"PROGRO_yoy",label:"利润总额同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"NETINC_yoy",label:"净利润同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"RATGRO_yoy",label:"纳税总额同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"C_ASSGROL_yoy",label:"净资产同比"}}),l("el-table-column",{attrs:{width:"150",align:"center",prop:"NPMOMB",label:"主营业务净利润率"}})],1)],1),l("el-dialog",{attrs:{title:"上传 模版 文件",visible:e.uploadDialog,width:"30%"},on:{"update:visible":function(t){e.uploadDialog=t}}},[l("el-upload",{staticClass:"upload-demo",attrs:{drag:"","on-success":e.uploadSuccess,action:e.uploadUrl,multiple:""}},[l("i",{staticClass:"el-icon-upload"}),l("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),l("em",[e._v("点击上传")])]),l("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能处理 模版 文件")])]),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.downFinanceFile}},[e._v("下载模版")])],1)],1),l("el-dialog",{attrs:{title:"",visible:e.inputOneDialog,width:"30%"},on:{"update:visible":function(t){e.inputOneDialog=t}}},[l("el-form",{attrs:{"label-width":"80px"}},[l("el-form-item",{attrs:{label:"企业名称"}},[l("el-input",{model:{value:e.inputOneValue,callback:function(t){e.inputOneValue=t},expression:"inputOneValue"}})],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.addOne}},[e._v("添加")])],1)],1)],1)},n=[],i=(l("4160"),l("c975"),l("b0c0"),l("498a"),l("159b"),{name:"",components:{},props:{},data:function(){return{payOneMoneyValue:0,uploadUrl:"https://api.meirixindong.com/admin_provide/v1/finance/uploadEntList",tableData:[],payEntValue:"",payEnt:[],payUserValue:"",payUser:[],uploadDialog:!1,inputOneDialog:!1,inputOneValue:"",data:[],value:[],filterMethod:function(e,t){return t.pinyin.indexOf(e)>-1},CkRange:"1"}},computed:{payOneMoney:function(){for(var e=[],t=0;t<=300;t++)e.push({label:t,value:t});return e}},mounted:function(){this.getIndex()},methods:{addOne:function(){this.inputOneValue.trim().length>3&&this.data.push({label:this.inputOneValue.trim(),key:this.inputOneValue.trim(),pinyin:"xxx"}),this.inputOneValue="",this.inputOneDialog=!1},downFinanceFile:function(){window.location.href="https://api.meirixindong.com/Static/financeUploadModel.csv"},exportDataBtn:function(){var e=this;if(this.value.length<=0)this.$message.warning("导出列表是空");else if(this.value.length>15)this.$message.warning("每次导出最大15家企业");else if(this.payEntValue.length>0&&this.payUserValue>0)this.$message.warning("付费对象只能有一个");else if(this.payEntValue.length<=0&&this.payUserValue<=0)this.$message.warning("付费对象必须有一个");else{var t={payEntValue:this.payEntValue,payUserValue:this.payUserValue,entList:JSON.stringify(this.value),money:this.payOneMoneyValue*this.value.length,CkRange:this.CkRange};this.$http.post("admin_provide/v1/finance/getFinanceData",t).then((function(t){var l=t.data;200===l.code&&(e.tableData=l.result.list,window.location.href="https://api.meirixindong.com/Static/Temp/"+l.result.file)})).catch((function(e){console.log(e)}))}},uploadSuccess:function(e,t,l){var a=this;this.uploadDialog=!1,this.data=[],e.result.forEach((function(e){a.data.push({label:e.name,key:e.name,pinyin:e.pinyin})}))},getIndex:function(){var e=this,t={id:1};this.$http.post("admin_provide/v1/finance/getIndex",t).then((function(t){var l=t.data;e.payEnt=[],e.payUser=[],l.result.entUserList.forEach((function(t){e.payEnt.push({label:t.username+" 余额: "+t.money,value:t.appId})})),l.result.userList.forEach((function(t){e.payUser.push({label:t.username+" - "+t.phone+" - "+t.company,value:t.phone})}))})).catch((function(e){console.log(e)}))}}}),o=i,r=(l("6387"),l("2877")),s=Object(r["a"])(o,a,n,!1,null,"e5cc72d2",null);t["default"]=s.exports}}]);