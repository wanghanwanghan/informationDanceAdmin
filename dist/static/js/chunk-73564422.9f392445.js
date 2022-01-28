(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73564422"],{"0ccb":function(t,e,r){var a=r("50c4"),o=r("1148"),n=r("1d80"),s=Math.ceil,i=function(t){return function(e,r,i){var l,c,u=String(n(e)),d=u.length,f=void 0===i?" ":String(i),m=a(r);return m<=d||""==f?u:(l=m-d,c=o.call(f,s(l/f.length)),c.length>l&&(c=c.slice(0,l)),t?u+c:c+u)}};t.exports={start:i(!1),end:i(!0)}},1148:function(t,e,r){"use strict";var a=r("a691"),o=r("1d80");t.exports="".repeat||function(t){var e=String(o(this)),r="",n=a(t);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(e+=e))1&n&&(r+=e);return r}},3301:function(t,e,r){"use strict";r("6ddc")},"4d90":function(t,e,r){"use strict";var a=r("23e7"),o=r("0ccb").start,n=r("9a0c");a({target:"String",proto:!0,forced:n},{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"6ddc":function(t,e,r){},"7d10":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-button",{staticClass:"addUserBtn-class",attrs:{type:"text"},on:{click:t.handleClickAddUser}},[t._v("添加用户")]),r("el-dialog",{attrs:{title:"添加用户",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{attrs:{model:t.form}},[r("el-form-item",{attrs:{label:"公司/用户名称","label-width":t.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"金额","label-width":t.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.money,callback:function(e){t.$set(t.form,"money",e)},expression:"form.money"}})],1),r("el-form-item",{attrs:{label:"Rsa 公钥","label-width":t.formLabelWidth}},[r("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:t.form.rsaPub,callback:function(e){t.$set(t.form,"rsaPub",e)},expression:"form.rsaPub"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-download"},on:{click:function(e){return t.downloadRsaPri(t.form.rsaPub)}},slot:"append"})],1)],1),r("el-form-item",{attrs:{label:"Rsa 私钥","label-width":t.formLabelWidth}},[r("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:t.form.rsaPri,callback:function(e){t.$set(t.form,"rsaPri",e)},expression:"form.rsaPri"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-download"},on:{click:function(e){return t.downloadRsaPri(t.form.rsaPri)}},slot:"append"})],1)],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.form.rsaPub?t._e():r("el-button",{attrs:{type:"warning"},on:{click:t.addRsaKey}},[t._v("添加Rsa密钥")]),r("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.handleAddUser}},[t._v("确 定")])],1)],1)],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[r("el-table-column",{attrs:{prop:"username",label:"公司/用户名称",width:"200"}}),r("el-table-column",{attrs:{prop:"appId",label:"appId",width:"300"}}),r("el-table-column",{attrs:{prop:"appSecret",label:"密钥",width:"200"}}),r("el-table-column",{attrs:{prop:"allowIp",label:"ip白名单",width:"100"}}),r("el-table-column",{attrs:{prop:"money",label:"账户余额"}}),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),r("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑 ")])]}}])})],1)],1)},o=[],n=(r("d3b7"),r("159b"),r("a9e3"),r("ed08")),s={name:"",components:{},props:{},data:function(){return{tableData:[],dialogFormVisible:!1,form:{actionType:"insert",user_id:"",username:"",money:"",rsaPub:"",rsaPri:""},formLabelWidth:"120px"}},computed:{},mounted:function(){this.getUserData()},methods:{downloadRsaPri:function(t){t.length<10?this.$message({type:"error",message:"没有秘钥文件"}):window.location.href="https://api.meirixindong.com/Static/RsaKey/"+t},addRsaKey:function(){var t=this,e={user_id:this.form.user_id};this.$http.post("admin_provide/v1/user/addRsaKey",e).then((function(e){var r=e.data;200===r.code?(t.$message({type:"success",message:"操作成功!"}),t.getUserData()):t.$message({type:"error",message:r.msg})})).catch((function(t){console.error(t)})),this.dialogFormVisible=!1},handleClickAddUser:function(){this.form.actionType="insert",this.form.username="",this.form.money="",this.dialogFormVisible=!0},handleEdit:function(t,e){this.form.actionType="update",this.form.user_id=e.id,this.form.username=e.username,this.form.money=e.money,this.form.rsaPub=e.rsaPub,this.form.rsaPri=e.rsaPri,this.dialogFormVisible=!0},handleUserInfo:function(t){return t.forEach((function(t){1===t.status?t.status="正常":t.status="异常",t.money=Number(t.money),t.created_at=Object(n["a"])(t.created_at,"{y}-{m}-{d}")})),t},handleAddUser:function(){var t=this,e={actionType:this.form.actionType,user_id:this.form.user_id,username:this.form.username,money:this.form.money};this.$http.post("admin_provide/v1/user/addUser",e).then((function(e){var r=e.data;200===r.code?(t.$message({type:"success",message:"操作成功!"}),t.getUserData()):t.$message({type:"error",message:r.msg})})).catch((function(t){console.error(t)})),this.dialogFormVisible=!1},getUserData:function(){var t=this;this.$http.post("admin_provide/v1/user/getUserList",{}).then((function(e){var r=e.data;200===r.code?t.tableData=t.handleUserInfo(r.result):t.$message({type:"error",message:r.msg})})).catch((function(t){console.error(t)}))}}},i=s,l=(r("3301"),r("2877")),c=Object(l["a"])(i,a,o,!1,null,"77d14426",null);e["default"]=c.exports},"9a0c":function(t,e,r){var a=r("342f");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(a)},a9e3:function(t,e,r){"use strict";var a=r("83ab"),o=r("da84"),n=r("94ca"),s=r("6eeb"),i=r("5135"),l=r("c6b6"),c=r("7156"),u=r("c04e"),d=r("d039"),f=r("7c73"),m=r("241c").f,p=r("06cf").f,b=r("9bf2").f,h=r("58a8").trim,g="Number",y=o[g],v=y.prototype,w=l(f(v))==g,_=function(t){var e,r,a,o,n,s,i,l,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=h(c),e=c.charCodeAt(0),43===e||45===e){if(r=c.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+c}for(n=c.slice(2),s=n.length,i=0;i<s;i++)if(l=n.charCodeAt(i),l<48||l>o)return NaN;return parseInt(n,a)}return+c};if(n(g,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var I,S=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof S&&(w?d((function(){v.valueOf.call(r)})):l(r)!=g)?c(new y(_(e)),r,S):_(e)},N=a?m(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),P=0;N.length>P;P++)i(y,I=N[P])&&!i(S,I)&&b(S,I,p(y,I));S.prototype=v,v.constructor=S,s(o,g,S)}},ed08:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}r("ac1f"),r("00b4"),r("5319"),r("4d63"),r("2c3e"),r("25f0"),r("4d90"),r("1276"),r("159b");function o(t,e){if(0===arguments.length||!t)return null;var r,o=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===a(t)?r=t:("string"===typeof t&&(t=/^[0-9]+$/.test(t)?parseInt(t):t.replace(new RegExp(/-/gm),"/")),"number"===typeof t&&10===t.toString().length&&(t*=1e3),r=new Date(t));var n={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()},s=o.replace(/{([ymdhisa])+}/g,(function(t,e){var r=n[e];return"a"===e?["日","一","二","三","四","五","六"][r]:r.toString().padStart(2,"0")}));return s}}}]);