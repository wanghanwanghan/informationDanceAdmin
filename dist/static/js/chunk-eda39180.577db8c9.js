(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eda39180"],{"0ccb":function(e,t,o){var a=o("50c4"),r=o("1148"),n=o("1d80"),l=Math.ceil,i=function(e){return function(t,o,i){var s,c,f=String(n(t)),u=f.length,m=void 0===i?" ":String(i),d=a(o);return d<=u||""==m?f:(s=d-u,c=r.call(m,l(s/m.length)),c.length>s&&(c=c.slice(0,s)),e?f+c:c+f)}};e.exports={start:i(!1),end:i(!0)}},1148:function(e,t,o){"use strict";var a=o("a691"),r=o("1d80");e.exports="".repeat||function(e){var t=String(r(this)),o="",n=a(e);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(t+=t))1&n&&(o+=t);return o}},"4d90":function(e,t,o){"use strict";var a=o("23e7"),r=o("0ccb").start,n=o("9a0c");a({target:"String",proto:!0,forced:n},{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"5b12":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-row",[o("el-button",{staticClass:"addUserBtn-class",attrs:{type:"text"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加用户")]),o("el-dialog",{attrs:{title:"添加用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{attrs:{model:e.form}},[o("el-form-item",{attrs:{label:"手机号","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),o("el-form-item",{attrs:{label:"用户名","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),o("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),o("el-form-item",{attrs:{label:"公司","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.company,callback:function(t){e.$set(e.form,"company",t)},expression:"form.company"}})],1),o("el-form-item",{attrs:{label:"邮箱","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),o("el-form-item",{attrs:{label:"金额","label-width":e.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择金额"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}},[o("el-option",{attrs:{label:"500",value:"500"}}),o("el-option",{attrs:{label:"1000",value:"1000"}}),o("el-option",{attrs:{label:"2000",value:"2000"}}),o("el-option",{attrs:{label:"5000",value:"5000"}}),o("el-option",{attrs:{label:"10000",value:"10000"}}),o("el-option",{attrs:{label:"20000",value:"20000"}}),o("el-option",{attrs:{label:"50000",value:"50000"}})],1)],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.handleAddUser}},[e._v("确 定")])],1)],1)],1),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[o("el-table-column",{attrs:{prop:"username",label:"用户名",width:"200"}}),o("el-table-column",{attrs:{prop:"company",label:"公司"}}),o("el-table-column",{attrs:{prop:"password",label:"密码",width:"150"}}),o("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"220"}}),o("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"150"}}),o("el-table-column",{attrs:{prop:"money",label:"账户余额",width:"100"}}),o("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑 ")])]}}])})],1)],1)},r=[],n=(o("4160"),o("a9e3"),o("159b"),o("ed08")),l={name:"",components:{},props:{},data:function(){return{tableData:[],dialogFormVisible:!1,form:{phone:"",username:"",password:"",company:"",email:"",money:""},formLabelWidth:"120px"}},computed:{},mounted:function(){var e=this,t={page:1,pageSize:1e4};this.$http.post("admin/v1/user/list",t).then((function(t){var o=t.data;200===o.code?(e.$message({type:"success",message:"操作成功!"}),e.tableData=e.handleUserInfo(o.result)):e.$message({type:"error",message:o.msg})})).catch((function(e){console.error(e)}))},methods:{handleEdit:function(e,t){},handleUserInfo:function(e){return e.forEach((function(e){e.money=Number(e.money),e.created_at=Object(n["a"])(e.created_at,"{y}-{m}-{d}")})),e},handleAddUser:function(){var e=this,t={phone:this.form.phone,username:this.form.username,password:this.form.password,company:this.form.company,email:this.form.email,money:this.form.money};this.$http.post("admin/v1/user/addUser",t).then((function(t){var o=t.data;200===o.code?e.$message({type:"success",message:"操作成功!"}):e.$message({type:"error",message:o.msg})})).catch((function(e){console.error(e)})),this.dialogFormVisible=!1}}},i=l,s=(o("c0e8"),o("2877")),c=Object(s["a"])(i,a,r,!1,null,"1672f236",null);t["default"]=c.exports},"9a0c":function(e,t,o){var a=o("342f");e.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(a)},a9e3:function(e,t,o){"use strict";var a=o("83ab"),r=o("da84"),n=o("94ca"),l=o("6eeb"),i=o("5135"),s=o("c6b6"),c=o("7156"),f=o("c04e"),u=o("d039"),m=o("7c73"),d=o("241c").f,p=o("06cf").f,b=o("9bf2").f,h=o("58a8").trim,g="Number",y=r[g],v=y.prototype,w=s(m(v))==g,S=function(e){var t,o,a,r,n,l,i,s,c=f(e,!1);if("string"==typeof c&&c.length>2)if(c=h(c),t=c.charCodeAt(0),43===t||45===t){if(o=c.charCodeAt(2),88===o||120===o)return NaN}else if(48===t){switch(c.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+c}for(n=c.slice(2),l=n.length,i=0;i<l;i++)if(s=n.charCodeAt(i),s<48||s>r)return NaN;return parseInt(n,a)}return+c};if(n(g,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var I,N=function(e){var t=arguments.length<1?0:e,o=this;return o instanceof N&&(w?u((function(){v.valueOf.call(o)})):s(o)!=g)?c(new y(S(t)),o,N):S(t)},E=a?d(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;E.length>_;_++)i(y,I=E[_])&&!i(N,I)&&b(N,I,p(y,I));N.prototype=v,v.constructor=N,l(r,g,N)}},c0e8:function(e,t,o){"use strict";o("f079")},ed08:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));o("4160"),o("c975"),o("d3b7"),o("4d63"),o("ac1f"),o("25f0"),o("4d90"),o("5319"),o("1276"),o("159b"),o("a4d3"),o("e01a"),o("d28b"),o("3ca3"),o("ddb0");function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function r(e,t){if(0===arguments.length||!e)return null;var o,r=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===a(e)?o=e:("string"===typeof e&&(e=/^[0-9]+$/.test(e)?parseInt(e):e.replace(new RegExp(/-/gm),"/")),"number"===typeof e&&10===e.toString().length&&(e*=1e3),o=new Date(e));var n={y:o.getFullYear(),m:o.getMonth()+1,d:o.getDate(),h:o.getHours(),i:o.getMinutes(),s:o.getSeconds(),a:o.getDay()},l=r.replace(/{([ymdhisa])+}/g,(function(e,t){var o=n[t];return"a"===t?["日","一","二","三","四","五","六"][o]:o.toString().padStart(2,"0")}));return l}},f079:function(e,t,o){}}]);