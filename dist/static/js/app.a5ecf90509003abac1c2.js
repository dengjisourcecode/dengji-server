webpackJsonp([1],{"1uuo":function(t,e){},"F+0n":function(t,e){},JSlp:function(t,e){},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=r("VU/8")({name:"App"},s,!1,function(t){r("F+0n")},null,null).exports,a=r("/ocq"),i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("h1",[t._v(t._s(t.msg))]),t._v(" "),r("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),r("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),r("br"),t._v(" "),r("li",[r("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var l=r("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},i,!1,function(t){r("1uuo")},"data-v-d8ec41bc",null).exports,u={name:"infomationadd",methods:{onSubmit:function(){var t=this;if(this.errorinfo.error=!1,0===this.form.username.length)return this.errorinfo.error=!0,this.errorinfo.context="用户名不能为空",console.log(1),!1;if(!/^(\d{3,4}|\d{3,4}-)?\d{7,14}$/.test(this.form.phone)&&(console.log(21),!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.form.phone)))return this.errorinfo.error=!0,this.errorinfo.context="电话号码格式错误",console.log(22),!1;if(!/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d{1}|(X|x))$/.test(this.form.cardnumber))return this.errorinfo.error=!0,this.errorinfo.context="身份证号码错误",console.log(3),!1;if(0!=this.form.temperature.length){if(!/^(\-)?\d+(\.\d{1,2})?$/.test(this.form.temperature))return this.errorinfo.error=!0,this.errorinfo.context="体温输入错误",console.log(4),!1}else this.form.temperature="0";this.$axios({method:"post",url:"http://182.92.232.205:8083/info/insert",data:this.form,headers:{}}).then(function(e){console.log(e.data.code),200===e.data.code?t.$router.push({name:"success"}):t.$router.push({name:"error"})}).catch(function(t){})}},data:function(){return{labelPosition:"top",errorinfo:{error:!1,context:" "},form:{username:"",phone:"",cardnumber:"",address:"",temperature:""}}}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[t._m(0),t._v(" "),r("div",{staticClass:"p2"},[r("el-form",{ref:"form",attrs:{"label-position":t.labelPosition,model:t.form}},[r("el-form-item",{attrs:{label:"人员名称"}},[r("el-input",{attrs:{placeholder:"必填"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"联系电话"}},[r("el-input",{attrs:{placeholder:"必填"},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"身份证号码"}},[r("el-input",{attrs:{placeholder:"必填"},model:{value:t.form.cardnumber,callback:function(e){t.$set(t.form,"cardnumber",e)},expression:"form.cardnumber"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"居住地址"}},[r("el-input",{attrs:{placeholder:"如道路、门牌号、楼栋号、单元室等"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"测量体温"}},[r("el-input",{attrs:{placeholder:"请填写实际体温"},model:{value:t.form.temperature,callback:function(e){t.$set(t.form,"temperature",e)},expression:"form.temperature"}})],1),t._v(" "),r("el-form-item",[r("label",{staticClass:"error"},[t._v(t._s(t.errorinfo.context))])])],1)],1),t._v(" "),r("div",{staticClass:"p3"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("登记")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"p1"},[e("div",{staticClass:"title"},[this._v("抗击新冠肺炎")]),this._v(" "),e("div",{staticClass:"title-1"},[this._v("为了疫情可控，请大家主动登记")])])}]};var m=r("VU/8")(u,c,!1,function(t){r("sW/E")},"data-v-32055dc9",null).exports,f={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  "+this._s(this.message)+"\n")])},staticRenderFns:[]};var h=r("VU/8")({name:"error",data:function(){return{message:"error"}}},f,!1,function(t){r("VtJm")},"data-v-140a35fb",null).exports,d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:r("zXX3")}})]),this._v(" "),e("div",{staticClass:"title2"},[this._v("\n    登记成功，感谢您的支持！\n  ")])])}]};var v=r("VU/8")({name:"success",data:function(){return{message:"success"}}},d,!1,function(t){r("JSlp")},"data-v-f29e681a",null).exports;n.default.use(a.a);var p=new a.a({routes:[{path:"/",name:"HelloWorld",component:l},{path:"/infomationadd",name:"infomationadd",component:m},{path:"/error",name:"error",component:h},{path:"/success",name:"success",component:v}]}),_=r("zL8q"),b=r.n(_),g=(r("tvR6"),r("mtWM")),x=r.n(g);n.default.use(b.a),n.default.config.productionTip=!1,n.default.prototype.$axios=x.a,new n.default({el:"#app",router:p,components:{App:o},template:"<App/>"})},VtJm:function(t,e){},"sW/E":function(t,e){},tvR6:function(t,e){},zXX3:function(t,e,r){t.exports=r.p+"static/img/honglinhuasheng.6056958.png"}},["NHnr"]);
//# sourceMappingURL=app.a5ecf90509003abac1c2.js.map