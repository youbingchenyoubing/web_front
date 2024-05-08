import{bi as x,_ as M,r as w,o as d,a8 as g,w as t,aB as j,aC as ne,f as e,d as S,aA as U,F as D,h as f,E as R,b as O,c as F,d8 as se,aK as ae,e as i,a9 as J,ab as C,bz as K,p as W,i as X,bE as H,bD as re,c8 as ie}from"./index.41bf9c1b.js";import{E as ue,a as ce}from"./el-table-column.4b985531.js";import{a as q}from"./el-popper.7ae0c7d7.js";import{E as de}from"./el-link.e79f8a31.js";import{f as me}from"./formatDate.66ef0a13.js";import{s as _e}from"./setClipboard.bf8addf7.js";import"./el-collapse-transition.bb7c8a08.js";import{E as pe,a as fe}from"./el-select.1fc6c445.js";import{u as A,b as Y}from"./EnumGlobalStore.f9b8c63d.js";import{E as he}from"./index.aa5a1392.js";import{E as B,a as P}from"./index.39967f43.js";import{E as $}from"./el-dialog.db387371.js";/* empty css                   *//* empty css                       */import{E as Q,a as z}from"./el-radio.4d7862e0.js";import{E as be}from"./el-input-number.4430b736.js";import"./el-tree.6cd31066.js";import{E as ye}from"./el-tree-select.99e543bc.js";import{a as ve,b as ge,c as Ve,d as ke,A as Ie,n as Ee,e as we}from"./index.6dbeb167.js";import{E as Se}from"./index.01c8af0b.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";import"./index.6f6ffc3e.js";import"./strings.2f51a18b.js";import"./castArray.422477ef.js";import"./index.5d666713.js";import"./refs.90407178.js";import"./index.56404ca9.js";const Ce={props:["show"],emits:["onSearch"],data(){return{form:{name:"",enabled:"",type:""},system_global_status:[],system_menu_type:[]}},methods:{...x(A,["resolveDictItemEnum"]),async init(){const n=await this.resolveDictItemEnum(["system_global_status","system_menu_type"]);Object.assign(this,n)},handleReset(){this.$emit("onSearch",{})},handleSearch(){const n=Object.entries(this.form).reduce((o,[V,p])=>(p!==""&&(o[V]=p),o),{});this.$emit("onSearch",n)}},created(){this.init()}};function De(n,o,V,p,l,a){const E=R,u=B,h=pe,v=fe,m=w("Search"),r=O,y=F,_=w("Refresh"),b=P,s=he;return d(),g(s,null,{default:t(()=>[j(e(b,{class:"sys-filters",ref:"formRef",inline:"",model:l.form},{default:t(()=>[e(u,{label:"\u83DC\u5355\u540D\u79F0",prop:"name"},{default:t(()=>[e(E,{placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",clearable:"",modelValue:l.form.name,"onUpdate:modelValue":o[0]||(o[0]=k=>l.form.name=k)},null,8,["modelValue"])]),_:1}),e(u,{label:"\u72B6\u6001",prop:"enabled"},{default:t(()=>[e(v,{placeholder:"\u8BF7\u9009\u62E9\u72B6\u6001",clearable:"",modelValue:l.form.enabled,"onUpdate:modelValue":o[1]||(o[1]=k=>l.form.enabled=k)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_status,k=>(d(),g(h,{key:k.v,label:k.k,value:k.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(u,{label:"\u83DC\u5355\u7C7B\u578B",prop:"type"},{default:t(()=>[e(v,{placeholder:"\u8BF7\u9009\u62E9\u83DC\u5355\u7C7B\u578B",clearable:"",modelValue:l.form.type,"onUpdate:modelValue":o[2]||(o[2]=k=>l.form.type=k)},{default:t(()=>[(d(!0),S(D,null,U(l.system_menu_type,k=>(d(),g(h,{key:k.v,label:k.k,value:k.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(u,null,{default:t(()=>[e(y,{type:"primary",onClick:a.handleSearch},{default:t(()=>[e(r,null,{default:t(()=>[e(m)]),_:1}),f(" \u641C\u7D22 ")]),_:1},8,["onClick"]),e(y,{onClick:a.handleReset},{default:t(()=>[e(r,null,{default:t(()=>[e(_)]),_:1}),f(" \u91CD\u7F6E ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"]),[[ne,V.show]])]),_:1})}const Ue=M(Ce,[["render",De]]),ee=Object.keys(se);const Me={inheritAttrs:!1,props:["modelValue"],emits:["update:modelValue"],data(){return{iconOptions:[],searchInput:"",IconDialog:!1}},computed:{input:{get(){return this.modelValue},set(n){this.$emit("update:modelValue",n)}}},methods:{handleClick(n){this.input=n,this.searchInput="",this.IconDialog=!1},onShowIconDiaLog(){this.IconDialog=!0}},watch:{searchInput(n){clearTimeout(()=>this.searchInputTimeout),this.searchInputTimeout=setTimeout(()=>{this.iconOptions=n?this._iconOptions.filter(o=>new RegExp(n,"i").test(o)):[...this._iconOptions]},700)}},created(){this._iconOptions=this.iconOptions=ee}},Te={class:"icon-search"},Re={class:"icon-list"},Oe=["onClick"],xe=["title"];function Fe(n,o,V,p,l,a){const E=w("Search"),u=O,h=F,v=R,m=$;return d(),S(D,null,[e(v,ae({modelValue:a.input,"onUpdate:modelValue":o[0]||(o[0]=r=>a.input=r)},n.$attrs,{disabled:""}),{append:t(()=>[e(h,{onClick:a.onShowIconDiaLog},{default:t(()=>[e(u,null,{default:t(()=>[e(E)]),_:1})]),_:1},8,["onClick"])]),_:1},16,["modelValue"]),e(m,{modelValue:l.IconDialog,"onUpdate:modelValue":o[2]||(o[2]=r=>l.IconDialog=r),title:"\u9009\u62E9\u56FE\u6807",width:"45%"},{default:t(()=>[i("section",Te,[e(v,{modelValue:l.searchInput,"onUpdate:modelValue":o[1]||(o[1]=r=>l.searchInput=r),placeholder:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u8FDB\u884C\u7B5B\u9009"},null,8,["modelValue"])]),i("div",Re,[(d(!0),S(D,null,U(l.iconOptions,r=>(d(),S("section",{class:"icon-item",key:r,onClick:y=>a.handleClick(r)},[e(u,{class:"icon-each"},{default:t(()=>[(d(),g(J(r),{class:"icon-each"}))]),_:2},1024),i("span",{title:r},C(r),9,xe)],8,Oe))),128))])]),_:1},8,["modelValue"])],64)}const L=M(Me,[["render",Fe],["__scopeId","data-v-0a6c7cd3"]]);const Ae={data(){return{form:{icon:"",outerChain:!1,path:"",visible:0,enabled:1,redirect:""},rules:{path:[{required:!0,message:"\u8DEF\u7531\u5730\u5740\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{message:"\u5916\u94FE\u5730\u5740\u5FC5\u987B\u662F`http(s)`\u5F00\u5934",trigger:"blur",validator:(n,o)=>this.form.outerChain?K.test(o):!0}]},system_global_visibility:[],system_global_status:[]}},methods:{...x(A,["resolveDictItemEnum"]),async init(){const n=await this.resolveDictItemEnum(["system_global_status","system_global_visibility"]);Object.assign(this,n),this._setValue||Object.assign(this.form,{visible:n.system_global_visibility[0].v,enabled:n.system_global_status[0].v})},validate(){return this.$refs.formRef.validate()},resetFields(){this.$refs.formRef.resetFields()},setValues(n){this._setValue=!0,Object.assign(this.form,n),this.form.outerChain=K.test(n.path.toString())}},components:{InputSelectIcons:L},created(){this.init()}},N=n=>(W("data-v-2e5393dd"),n=n(),X(),n),Be={class:"center"},Pe=N(()=>i("span",{class:"l-4"},"\u72B6\u6001",-1)),je={class:"center"},qe=N(()=>i("span",{class:"l-4"},"\u662F\u5426\u5916\u94FE",-1)),Qe={class:"center"},ze=N(()=>i("span",{class:"l-4"},"\u8DEF\u7531\u5730\u5740",-1)),Le={class:"center"},Ne=N(()=>i("span",{class:"l-4"},"\u662F\u5426\u663E\u793A",-1));function Ge(n,o,V,p,l,a){const E=L,u=B,h=w("QuestionFilled"),v=O,m=q,r=Q,y=z,_=R,b=P;return d(),g(b,{"label-width":"100px",ref:"formRef",model:l.form,rules:l.rules},{default:t(()=>[e(u,{label:"\u83DC\u5355\u56FE\u6807",class:"inline"},{default:t(()=>[e(E,{modelValue:l.form.icon,"onUpdate:modelValue":o[0]||(o[0]=s=>l.form.icon=s),placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6240\u4F7F\u7528\u7684\u56FE\u6807"},null,8,["modelValue"])]),_:1}),e(u,{class:"inline"},{label:t(()=>[e(m,{effect:"dark",content:"\u9009\u62E9\u505C\u7528\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4E5F\u4E0D\u80FD\u88AB\u8BBF\u95EE",placement:"top"},{default:t(()=>[i("div",Be,[e(v,null,{default:t(()=>[e(h)]),_:1}),Pe])]),_:1})]),default:t(()=>[e(y,{modelValue:l.form.enabled,"onUpdate:modelValue":o[1]||(o[1]=s=>l.form.enabled=s)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_status,s=>(d(),g(r,{key:s.v,label:s.v},{default:t(()=>[f(C(s.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(u,{class:"inline"},{label:t(()=>[e(m,{effect:"dark",content:"\u9009\u62E9\u662F\u5916\u94FE\u5219\u8DEF\u7531\u5730\u5740\u9700\u8981\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:t(()=>[i("div",je,[e(v,null,{default:t(()=>[e(h)]),_:1}),qe])]),_:1})]),default:t(()=>[e(y,{modelValue:l.form.outerChain,"onUpdate:modelValue":o[2]||(o[2]=s=>l.form.outerChain=s)},{default:t(()=>[e(r,{label:!0},{default:t(()=>[f("\u662F")]),_:1}),e(r,{label:!1},{default:t(()=>[f("\u5426")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(u,{prop:"path",class:"inline"},{label:t(()=>[e(m,{effect:"dark",content:"\u8BBF\u95EE\u7684\u8DEF\u7531\u5730\u5740\uFF0C\u5982\uFF1A`/system/user`\uFF0C\u5982\u5916\u7F51\u5730\u5740\u9700\u5185\u94FE\u8BBF\u95EE\u5219\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:t(()=>[i("div",Qe,[e(v,null,{default:t(()=>[e(h)]),_:1}),ze])]),_:1})]),default:t(()=>[e(_,{modelValue:l.form.path,"onUpdate:modelValue":o[3]||(o[3]=s=>l.form.path=s),placeholder:"\u8BF7\u8F93\u5165\u8DEF\u7531\u5730\u5740"},null,8,["modelValue"])]),_:1}),e(u,{prop:"redirect",label:"\u91CD\u5B9A\u5411\u5730\u5740",class:"inline"},{default:t(()=>[e(_,{modelValue:l.form.redirect,"onUpdate:modelValue":o[4]||(o[4]=s=>l.form.redirect=s),placeholder:"\u8BF7\u8F93\u5165\u91CD\u5B9A\u5411\u7684\u5730\u5740"},null,8,["modelValue"])]),_:1}),e(u,{class:"inline"},{label:t(()=>[e(m,{effect:"dark",content:"\u9009\u62E9\u9690\u85CF\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4F46\u4ECD\u7136\u53EF\u4EE5\u8BBF\u95EE",placement:"top"},{default:t(()=>[i("div",Le,[e(v,null,{default:t(()=>[e(h)]),_:1}),Ne])]),_:1})]),default:t(()=>[e(y,{modelValue:l.form.visible,"onUpdate:modelValue":o[5]||(o[5]=s=>l.form.visible=s)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_visibility,s=>(d(),g(r,{key:s.v,label:s.v},{default:t(()=>[f(C(s.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])}const Ye=M(Ae,[["render",Ge],["__scopeId","data-v-2e5393dd"]]);const Ke={data(){return{form:{icon:"",outerChain:!1,path:"",componentPath:"",perms:"",query:"",cache:1,visible:0,enabled:1,redirect:""},rules:{path:[{required:!0,message:"\u8DEF\u7531\u5730\u5740\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{message:"\u5916\u94FE\u5730\u5740\u5FC5\u987B\u662F`http(s)`\u5F00\u5934",trigger:"blur",validator:(n,o)=>this.form.outerChain?K.test(o):!0}]},system_global_visibility:[],system_global_status:[],system_global_cache:[]}},methods:{...x(A,["resolveDictItemEnum"]),async init(){const n=await this.resolveDictItemEnum(["system_global_status","system_global_visibility","system_global_cache"]);Object.assign(this,n),this._setValue||Object.assign(this.form,{visible:n.system_global_visibility[0].v,enabled:n.system_global_status[0].v,cache:n.system_global_cache[0].v})},validate(){return this.$refs.formRef.validate()},resetFields(){this.$refs.formRef.resetFields()},setValues(n){this._setValue=!0,Object.assign(this.form,n)}},components:{InputSelectIcons:L},created(){this.init()}},T=n=>(W("data-v-faa9f498"),n=n(),X(),n),He={class:"center"},Je=T(()=>i("span",{class:"l-4"},"\u6743\u9650\u5B57\u7B26",-1)),We={class:"center"},Xe=T(()=>i("span",{class:"l-4"},"\u662F\u5426\u5916\u94FE",-1)),Ze={class:"center"},$e=T(()=>i("span",{class:"l-4"},"\u8DEF\u7531\u5730\u5740",-1)),et={class:"center"},tt=T(()=>i("span",{class:"l-4"},"\u8DEF\u7531\u53C2\u6570",-1)),lt={class:"center"},ot=T(()=>i("span",{class:"l-4"},"\u662F\u5426\u7F13\u5B58",-1)),nt={class:"center"},st=T(()=>i("span",{class:"l-4"},"\u662F\u5426\u663E\u793A",-1)),at={class:"center"},rt=T(()=>i("span",{class:"l-4"},"\u72B6\u6001",-1));function it(n,o,V,p,l,a){const E=w("Search"),u=O,h=F,v=L,m=B,r=w("QuestionFilled"),y=q,_=R,b=Q,s=z,k=P;return d(),g(k,{"label-width":"100px",ref:"formRef",model:l.form,rules:l.rules},{default:t(()=>[e(m,{label:"\u83DC\u5355\u56FE\u6807",class:"inline"},{default:t(()=>[e(v,{modelValue:l.form.icon,"onUpdate:modelValue":o[0]||(o[0]=c=>l.form.icon=c),placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6240\u4F7F\u7528\u7684\u56FE\u6807"},{append:t(()=>[e(h,null,{default:t(()=>[e(u,null,{default:t(()=>[e(E)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u63A7\u5236\u5668\u4E2D\u5B9A\u4E49\u7684\u6743\u9650\u5B57\u7B26\uFF0C\u5982\uFF1A@PreAuthorize(`@ss.hasPerm('system:user:list')`)",placement:"top"},{default:t(()=>[i("div",He,[e(u,null,{default:t(()=>[e(r)]),_:1}),Je])]),_:1})]),default:t(()=>[e(_,{modelValue:l.form.perms,"onUpdate:modelValue":o[1]||(o[1]=c=>l.form.perms=c),placeholder:"\u8BF7\u8F93\u5165\u6743\u9650\u6807\u8BC6"},null,8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u9009\u62E9\u662F\u5916\u94FE\u5219\u8DEF\u7531\u5730\u5740\u9700\u8981\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:t(()=>[i("div",We,[e(u,null,{default:t(()=>[e(r)]),_:1}),Xe])]),_:1})]),default:t(()=>[e(s,{modelValue:l.form.outerChain,"onUpdate:modelValue":o[2]||(o[2]=c=>l.form.outerChain=c)},{default:t(()=>[e(b,{label:!0},{default:t(()=>[f("\u662F")]),_:1}),e(b,{label:!1},{default:t(()=>[f("\u5426")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(m,{prop:"path",class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u8BBF\u95EE\u7684\u8DEF\u7531\u5730\u5740\uFF0C\u5982\uFF1A`/system/user`\uFF0C\u5982\u5916\u7F51\u5730\u5740\u9700\u5185\u94FE\u8BBF\u95EE\u5219\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:t(()=>[i("div",Ze,[e(u,null,{default:t(()=>[e(r)]),_:1}),$e])]),_:1})]),default:t(()=>[e(_,{modelValue:l.form.path,"onUpdate:modelValue":o[3]||(o[3]=c=>l.form.path=c),placeholder:"\u8BF7\u8F93\u5165\u8DEF\u7531\u5730\u5740"},null,8,["modelValue"])]),_:1}),e(m,{prop:"redirect",label:"\u91CD\u5B9A\u5411\u5730\u5740",class:"inline"},{default:t(()=>[e(_,{modelValue:l.form.redirect,"onUpdate:modelValue":o[4]||(o[4]=c=>l.form.redirect=c),placeholder:"\u8BF7\u8F93\u5165\u91CD\u5B9A\u5411\u7684\u5730\u5740"},null,8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u8BBF\u95EE\u8DEF\u7531\u7684\u9ED8\u8BA4\u4F20\u9012\u53C2\u6570\uFF0C\u5982\uFF1A`{id: 1, name: 'ry'}`",placement:"top"},{default:t(()=>[i("div",et,[e(u,null,{default:t(()=>[e(r)]),_:1}),tt])]),_:1})]),default:t(()=>[e(_,{modelValue:l.form.query,"onUpdate:modelValue":o[5]||(o[5]=c=>l.form.query=c),placeholder:"\u8BF7\u8F93\u5165\u8DEF\u7531\u53C2\u6570"},null,8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u9009\u62E9\u662F\u5219\u4F1A\u88AB`keep-alive`\u7F13\u5B58\uFF0C\u9700\u8981\u5339\u914D\u7EC4\u4EF6\u7684`name`\u548C\u5730\u5740\u4FDD\u6301\u4E00\u81F4",placement:"top"},{default:t(()=>[i("div",lt,[e(u,null,{default:t(()=>[e(r)]),_:1}),ot])]),_:1})]),default:t(()=>[e(s,{modelValue:l.form.cache,"onUpdate:modelValue":o[6]||(o[6]=c=>l.form.cache=c)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_cache,c=>(d(),g(b,{key:c.v,label:c.v},{default:t(()=>[f(C(c.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u9009\u62E9\u9690\u85CF\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4F46\u4ECD\u7136\u53EF\u4EE5\u8BBF\u95EE",placement:"top"},{default:t(()=>[i("div",nt,[e(u,null,{default:t(()=>[e(r)]),_:1}),st])]),_:1})]),default:t(()=>[e(s,{modelValue:l.form.visible,"onUpdate:modelValue":o[7]||(o[7]=c=>l.form.visible=c)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_visibility,c=>(d(),g(b,{key:c.v,label:c.v},{default:t(()=>[f(C(c.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(y,{effect:"dark",content:"\u9009\u62E9\u505C\u7528\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4E5F\u4E0D\u80FD\u88AB\u8BBF\u95EE",placement:"top"},{default:t(()=>[i("div",at,[e(u,null,{default:t(()=>[e(r)]),_:1}),rt])]),_:1})]),default:t(()=>[e(s,{modelValue:l.form.enabled,"onUpdate:modelValue":o[8]||(o[8]=c=>l.form.enabled=c)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_status,c=>(d(),g(b,{key:c.v,label:c.v},{default:t(()=>[f(C(c.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"\u7EC4\u4EF6\u8DEF\u5F84",class:"inline"},{default:t(()=>[e(_,{modelValue:l.form.componentPath,"onUpdate:modelValue":o[9]||(o[9]=c=>l.form.componentPath=c),placeholder:"\u8BF7\u8F93\u5165\u7EC4\u4EF6\u8DEF\u5F84"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])}const ut=M(Ke,[["render",it],["__scopeId","data-v-faa9f498"]]);const ct={data(){return{form:{perms:"",enabled:""},rules:{},system_global_status:[]}},methods:{...x(A,["resolveDictItemEnum"]),async init(){const n=await this.resolveDictItemEnum(["system_global_status"]);Object.assign(this,n),this._setValue||Object.assign(this.form,{enabled:n.system_global_status[0].v})},validate(){return Promise.resolve(!0)},resetFields(){this.$refs.formRef.resetFields()},setValues(n){Object.assign(this.form,n),this._setValue=!0}},created(){this.init()}},te=n=>(W("data-v-ad674307"),n=n(),X(),n),dt={class:"center"},mt=te(()=>i("span",{class:"l-4"},"\u6743\u9650\u5B57\u7B26",-1)),_t={class:"center"},pt=te(()=>i("span",{class:"l-4"},"\u72B6\u6001",-1));function ft(n,o,V,p,l,a){const E=w("QuestionFilled"),u=O,h=q,v=R,m=B,r=Q,y=z,_=P;return d(),g(_,{"label-width":"100px",ref:"formRef",model:l.form,rules:l.rules},{default:t(()=>[e(m,{class:"inline"},{label:t(()=>[e(h,{effect:"dark",content:"\u63A7\u5236\u5668\u4E2D\u5B9A\u4E49\u7684\u6743\u9650\u5B57\u7B26\uFF0C\u5982\uFF1A@PreAuthorize(`@ss.hasPerm('system:user:list')`)",placement:"top"},{default:t(()=>[i("div",dt,[e(u,null,{default:t(()=>[e(E)]),_:1}),mt])]),_:1})]),default:t(()=>[e(v,{modelValue:l.form.perms,"onUpdate:modelValue":o[0]||(o[0]=b=>l.form.perms=b),placeholder:"\u8BF7\u8F93\u5165\u6743\u9650\u6807\u8BC6"},null,8,["modelValue"])]),_:1}),e(m,{class:"inline"},{label:t(()=>[e(h,{effect:"dark",content:"\u9009\u62E9\u505C\u7528\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4E5F\u4E0D\u80FD\u88AB\u8BBF\u95EE",placement:"top"},{default:t(()=>[i("div",_t,[e(u,null,{default:t(()=>[e(E)]),_:1}),pt])]),_:1})]),default:t(()=>[e(y,{modelValue:l.form.enabled,"onUpdate:modelValue":o[1]||(o[1]=b=>l.form.enabled=b)},{default:t(()=>[(d(!0),S(D,null,U(l.system_global_status,b=>(d(),g(r,{key:b.v,label:b.v},{default:t(()=>[f(C(b.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])}const ht=M(ct,[["render",ft],["__scopeId","data-v-ad674307"]]);const bt={props:["modelValue","update","type","id"],emits:["update:modelValue","onSubmit"],data(){return{form:{parentMenu:"",name:"",sort:1,type:0},formRules:{name:[{required:!0,message:"\u83DC\u5355\u540D\u79F0\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}],sort:[{required:!0,message:"\u663E\u793A\u987A\u5E8F\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}]},parentMenuTreeOptions:{options:[],props:{children:"children",label:"name"}}}},computed:{show:{get(){return this.modelValue},set(n){this.$emit("update:modelValue",n)}},dialogTitle(){return this.type===0?"\u6DFB\u52A0\u83DC\u5355":"\u66F4\u6539\u83DC\u5355"},activeTab(){return{0:"TabDir",1:"TabMenu",2:"TabButton"}[this.form.type]},title(){return this.type===1?"\u6DFB\u52A0\u83DC\u5355":"\u4FEE\u6539\u83DC\u5355"}},methods:{async init(){const n=await ve();this.parentMenuTreeOptions.options=[{id:"-1",name:"\u6839\u76EE\u5F55",children:n}],this.form.parentMenu="-1";const{type:o,id:V}=this;if(o===2){const p=await ge({id:V});Object.assign(this.form,{parentMenu:p.parentId,name:p.name,sort:p.sort,type:p.type}),await this.$nextTick(),this.$refs.subFormItemRef.setValues({...p,enabled:p.enabled.toString(),visible:p.visible.toString(),cache:p.cache.toString()})}},async invokeCreate(){const{parentMenu:n,name:o,sort:V,type:p}=this.form,{form:l}=this.$refs.subFormItemRef;await Ve({parentId:n,type:p,name:o,sort:V,path:l.path,query:l.query?l.query:"{}",component:l.component,cache:l.cache,visible:l.visible,enabled:l.enabled,perms:l.perms,icon:l.icon?l.icon:"IconEmpty",remark:l.remark,redirect:l.redirect}),H.success("\u6DFB\u52A0\u83DC\u5355\u6210\u529F")},async invokeUpdate(){const{parentMenu:n,name:o,sort:V,type:p}=this.form,{form:l}=this.$refs.subFormItemRef;await ke({id:this.id,parentId:n,type:p,name:o,sort:V,path:l.path,query:l.query?l.query:"{}",component:l.component,cache:l.cache,visible:l.visible,enabled:l.enabled,perms:l.perms,icon:l.icon?l.icon:"IconEmpty",remark:l.remark,redirect:l.redirect}),H.success("\u4FEE\u6539\u83DC\u5355\u6210\u529F")},async onSubmit(){const{formRef:n,subFormItemRef:o}=this.$refs;try{await n.validate(),await o.validate()}catch{return}this.type===1?await this.invokeCreate():await this.invokeUpdate(),this.$emit("onSubmit"),this.onCancel()},onCancel(){const{formRef:n,subFormItemRef:o}=this.$refs;n.resetFields(),o.resetFields(),this.show=!1}},watch:{show:{immediate:!0,handler(n){n&&this.init()}}},components:{TabDir:Ye,TabMenu:ut,TabButton:ht}},yt={class:"dialog-footer"};function vt(n,o,V,p,l,a){const E=ye,u=B,h=R,v=be,m=Q,r=z,y=P,_=F,b=$;return d(),g(b,{modelValue:a.show,"onUpdate:modelValue":o[4]||(o[4]=s=>a.show=s),title:a.title,width:"800px","append-to-body":!0,"destroy-on-close":!0,"before-close":a.onCancel},{default:t(()=>[e(y,{ref:"formRef",model:l.form,rules:l.formRules,"label-width":"100px",class:"form"},{default:t(()=>[e(u,{label:"\u4E0A\u7EA7\u83DC\u5355",prop:"parentMenu"},{default:t(()=>[e(E,{modelValue:l.form.parentMenu,"onUpdate:modelValue":o[0]||(o[0]=s=>l.form.parentMenu=s),data:l.parentMenuTreeOptions.options,props:l.parentMenuTreeOptions.props,"render-after-expand":!1,"check-strictly":!0,"value-key":"id"},null,8,["modelValue","data","props"])]),_:1}),e(u,{label:"\u83DC\u5355\u540D\u79F0",prop:"name"},{default:t(()=>[e(h,{placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",modelValue:l.form.name,"onUpdate:modelValue":o[1]||(o[1]=s=>l.form.name=s)},null,8,["modelValue"])]),_:1}),e(u,{label:"\u663E\u793A\u6392\u5E8F",prop:"sort",class:"inline"},{default:t(()=>[e(v,{modelValue:l.form.sort,"onUpdate:modelValue":o[2]||(o[2]=s=>l.form.sort=s),min:1},null,8,["modelValue"])]),_:1}),e(u,{label:"\u83DC\u5355\u7C7B\u578B",prop:"type"},{default:t(()=>[e(r,{modelValue:l.form.type,"onUpdate:modelValue":o[3]||(o[3]=s=>l.form.type=s)},{default:t(()=>[e(m,{label:0},{default:t(()=>[f("\u76EE\u5F55")]),_:1}),e(m,{label:1},{default:t(()=>[f("\u83DC\u5355")]),_:1}),e(m,{label:2},{default:t(()=>[f("\u6309\u94AE")]),_:1})]),_:1},8,["modelValue"])]),_:1}),(d(),g(J(a.activeTab),{ref:"subFormItemRef"},null,512))]),_:1},8,["model","rules"])]),footer:t(()=>[i("span",yt,[e(_,{onClick:a.onCancel},{default:t(()=>[f("\u53D6\u6D88")]),_:1},8,["onClick"]),e(_,{type:"primary",onClick:a.onSubmit},{default:t(()=>[f(" \u786E\u8BA4 ")]),_:1},8,["onClick"])])]),_:1},8,["modelValue","title","before-close"])}const gt=M(bt,[["render",vt],["__scopeId","data-v-848061fb"]]),Vt={data(){return{showSearch:!0,addAndUpdate:{show:!1,type:1,id:-10},tableData:[]}},computed:{checkedAll:{get(){return this.tableData.every(n=>n.checked)},set(n){this.tableData.forEach(o=>o.checked=n)}}},methods:{...x(A,["resolveDictItemEnum"]),async init(){const n=await this.resolveDictItemEnum(["system_global_status","system_global_visibility","system_menu_type"]),o=Y(n.system_global_status),V=Y(n.system_global_visibility),p=Y(n.system_menu_type),l=await Ie({current:1,size:2e3,...this.searchQuery});this.tableData=Ee(l.records,a=>{a.type=p[a.type],a.visible=V[a.visible],a.enabled=o[a.enabled],a.createTime=me("YYYY-MM-DD",a.createTime)})},async onDeleteMenu(n){re.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u83DC\u5355\u5417?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{await we({id:n.id}),H.success({message:"\u5220\u9664\u6210\u529F"}),this.init()}).catch(()=>null)},onSearch(n){this.searchQuery=n,this.init()},onChangeMenuDialog(n,o={}){return Object.assign(this.addAndUpdate,{show:!0,type:n,id:o.id})},checkBuiltinIcon(n){return ee.includes(n)?n:"EmptyComponent"},setCopy(n){_e(n)}},components:{Filters:Ue,MenuEditorDialog:gt},created(){this.searchQuery={},this.init()}},kt={class:"SystemMenu"},It={class:"sys-table-action"},Et={class:"sys-table-main-actions"};function wt(n,o,V,p,l,a){const E=w("Filters"),u=w("Plus"),h=O,v=F,m=w("Search"),r=q,y=w("RefreshRight"),_=ue,b=de,s=Se,k=w("EditPen"),c=w("Delete"),le=ce,oe=w("MenuEditorDialog"),G=ie("auth");return d(),S("div",kt,[e(E,{show:l.showSearch,onOnSearch:a.onSearch},null,8,["show","onOnSearch"]),i("section",It,[i("div",null,[j((d(),g(v,{type:"primary",onClick:o[0]||(o[0]=I=>a.onChangeMenuDialog(1))},{default:t(()=>[e(h,null,{default:t(()=>[e(u)]),_:1}),f(" \u65B0\u589E ")]),_:1})),[[G,"system:menu:add"]])]),i("div",null,[e(r,{class:"box-item",effect:"dark",content:`${l.showSearch?"\u9690\u85CF":"\u663E\u793A"}\u641C\u7D22`,placement:"top"},{default:t(()=>[e(v,{circle:"",plain:"",onClick:o[1]||(o[1]=I=>l.showSearch=!l.showSearch)},{default:t(()=>[e(h,null,{default:t(()=>[e(m)]),_:1})]),_:1})]),_:1},8,["content"]),e(r,{class:"box-item",effect:"dark",content:"\u5237\u65B0\u8868\u683C",placement:"top"},{default:t(()=>[e(v,{circle:"",plain:"",onClick:a.init},{default:t(()=>[e(h,null,{default:t(()=>[e(y)]),_:1})]),_:1},8,["onClick"])]),_:1})])]),e(le,{data:l.tableData,"row-key":"id",stripe:"",border:""},{default:t(()=>[e(_,{prop:"name",label:"\u83DC\u5355\u540D\u79F0",align:"left",width:"220"}),e(_,{label:"\u56FE\u6807",align:"center"},{default:t(({row:I})=>[e(h,{size:"1rem"},{default:t(()=>[(d(),g(J(a.checkBuiltinIcon(I.icon))))]),_:2},1024)]),_:1}),e(_,{prop:"perms",label:"\u6743\u9650\u6807\u8BC6",align:"center",width:"190"},{default:t(({row:I})=>[e(b,{underline:!1,onClick:Z=>a.setCopy(I.perms)},{default:t(()=>[f(C(I.perms),1)]),_:2},1032,["onClick"])]),_:1}),e(_,{label:"\u83DC\u5355\u7C7B\u578B",align:"center",width:"100"},{default:t(({row:I})=>[e(s,null,{default:t(()=>[f(C(I.type),1)]),_:2},1024)]),_:1}),e(_,{prop:"sort",label:"\u6392\u5E8F",align:"center"}),e(_,{label:"\u663E\u793A\u72B6\u6001",align:"center",width:"100"},{default:t(({row:I})=>[e(s,null,{default:t(()=>[f(C(I.visible),1)]),_:2},1024)]),_:1}),e(_,{label:"\u7981\u7528\u72B6\u6001",align:"center",width:"100"},{default:t(({row:I})=>[e(s,null,{default:t(()=>[f(C(I.enabled),1)]),_:2},1024)]),_:1}),e(_,{prop:"createTime",label:"\u521B\u5EFA\u65F6\u95F4",align:"center"}),e(_,{label:"\u64CD\u4F5C",align:"center",width:"120"},{default:t(({row:I})=>[i("div",Et,[j((d(),g(b,{type:"primary",underline:!1,style:{"margin-right":"4px"},onClick:Z=>a.onChangeMenuDialog(2,I)},{default:t(()=>[e(h,null,{default:t(()=>[e(k)]),_:1}),f(" \u4FEE\u6539 ")]),_:2},1032,["onClick"])),[[G,"system:menu:update"]]),j((d(),g(b,{type:"danger",underline:!1,onClick:Z=>a.onDeleteMenu(I)},{default:t(()=>[e(h,null,{default:t(()=>[e(c)]),_:1}),f(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[G,"system:menu:delete"]])])]),_:1})]),_:1},8,["data"]),e(oe,{modelValue:l.addAndUpdate.show,"onUpdate:modelValue":o[2]||(o[2]=I=>l.addAndUpdate.show=I),type:l.addAndUpdate.type,id:l.addAndUpdate.id,onOnSubmit:a.init},null,8,["modelValue","type","id","onOnSubmit"])])}const el=M(Vt,[["render",wt]]);export{el as default};