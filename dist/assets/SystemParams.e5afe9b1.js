import{bh as D,cn as F,bi as B,_ as P,r as f,o as c,a8 as h,w as l,aB as w,aC as X,f as o,d as U,aA as j,F as q,h as d,E as N,b as G,c as I,bE as V,ab as Q,e as E,bD as T,c8 as Y,ac as Z}from"./index.41bf9c1b.js";import{E as $}from"./el-pagination.1e9489f1.js";import{E as ee,a as te}from"./el-table-column.4b985531.js";import{E as oe,a as le}from"./el-select.1fc6c445.js";import{a as ne}from"./el-popper.7ae0c7d7.js";import{E as se}from"./el-link.e79f8a31.js";/* empty css                       *//* empty css                   */import{u as z,b as ae}from"./EnumGlobalStore.f9b8c63d.js";import"./el-collapse-transition.bb7c8a08.js";import{E as re}from"./index.aa5a1392.js";import{E as L,a as M}from"./index.39967f43.js";import{E as ie}from"./el-dialog.db387371.js";/* empty css                       */import{E as ce,a as me}from"./el-radio.4d7862e0.js";import{E as ue}from"./index.6f6ffc3e.js";import{E as de}from"./index.01c8af0b.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";import"./strings.2f51a18b.js";import"./castArray.422477ef.js";import"./index.5d666713.js";import"./refs.90407178.js";const pe=e=>D({url:"/system/config/page",data:e,loading:!0}),O=e=>D({url:"/system/config/delete/"+e.id,loading:!0}),_e=e=>D({url:"/system/config/get/"+e.key,loading:!0}),fe=e=>F({url:"/system/config/add",data:e,loading:!0}),he=e=>F({url:"/system/config/update",data:e,loading:!0}),ge={props:["show"],emits:["onSearch"],data(){return{form:{key:"",enabled:""},system_global_status:[]}},methods:{...B(z,["resolveDictItemEnum"]),async init(){const e=await this.resolveDictItemEnum(["system_global_status"]);Object.assign(this,e)},handleReset(){this.$emit("onSearch",{})},handleSearch(){const e=Object.entries(this.form).reduce((t,[r,m])=>(m!==""&&(t[r]=m),t),{});this.$emit("onSearch",e)}},created(){this.init()}};function be(e,t,r,m,n,s){const v=N,p=L,u=oe,g=le,C=f("Search"),b=G,y=I,i=f("Refresh"),x=M,k=re;return c(),h(k,null,{default:l(()=>[w(o(x,{class:"sys-filters",ref:"formRef",inline:"",model:n.form},{default:l(()=>[o(p,{label:"\u53C2\u6570\u952E\u540D",prop:"key"},{default:l(()=>[o(v,{placeholder:"\u8BF7\u8F93\u5165\u5B57\u5178\u540D\u79F0",clearable:"",modelValue:n.form.key,"onUpdate:modelValue":t[0]||(t[0]=_=>n.form.key=_)},null,8,["modelValue"])]),_:1}),o(p,{label:"\u72B6\u6001",prop:"enabled"},{default:l(()=>[o(g,{modelValue:n.form.enabled,"onUpdate:modelValue":t[1]||(t[1]=_=>n.form.enabled=_),clearable:"",placeholder:"\u8BF7\u9009\u62E9\u542F\u7528\u72B6\u6001"},{default:l(()=>[(c(!0),U(q,null,j(n.system_global_status,_=>(c(),h(u,{key:_.v,label:_.k,value:_.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(p,null,{default:l(()=>[o(y,{type:"primary",onClick:s.handleSearch},{default:l(()=>[o(b,null,{default:l(()=>[o(C)]),_:1}),d(" \u641C\u7D22 ")]),_:1},8,["onClick"]),o(y,{onClick:s.handleReset},{default:l(()=>[o(b,null,{default:l(()=>[o(i)]),_:1}),d(" \u91CD\u7F6E ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"]),[[X,r.show]])]),_:1})}const ye=P(ge,[["render",be]]),ke={props:["modelValue","type","keys","ids"],emits:["update:modelValue","onSubmit"],data(){return{form:{k:"",v:"",enabled:1},rules:{k:[{required:!0,message:"\u53C2\u6570\u952E\u540D\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{min:1,message:"\u53C2\u6570\u952E\u540D\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}],v:[{required:!0,message:"\u53C2\u6570\u952E\u503C\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{min:1,message:"\u53C2\u6570\u952E\u503C\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}]},system_global_status:[]}},computed:{show:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}},title(){return this.type===1?"\u6DFB\u52A0\u53C2\u6570\u914D\u7F6E":"\u4FEE\u6539\u53C2\u6570\u914D\u7F6E"}},methods:{...B(z,["resolveDictItemEnum"]),async init(){this.resolveDictItemEnum(["system_global_status"]).then(e=>{Object.assign(this,e),Object.assign(this.form,{enabled:e.system_global_status[0].v})}),this.type===2&&_e({key:this.keys[0]}).then(e=>{Object.assign(this.form,{...e,enabled:e.enabled.toString()})})},async invokeCreate(){const{k:e,v:t,enabled:r}=this.form;await fe({k:e,v:t,enabled:r}),V.success("\u6DFB\u52A0\u53C2\u6570\u914D\u7F6E\u6210\u529F")},async invokeUpdate(e){const{k:t,v:r,enabled:m}=this.form;await he({id:e,k:t,v:r,enabled:m}),V.success("\u4FEE\u6539\u53C2\u6570\u914D\u7F6E\u6210\u529F")},async onSubmit(){try{const{formRef:t}=this.$refs;await t.validate()}catch{return}const{type:e}=this;if(e===1)await this.invokeCreate();else if(e===2)await this.invokeUpdate(this.ids[0]);else if(e===3)await Promise.all(this.ids.map(this.invokeUpdate));else return console.error("SystemParams->EditorDialog->onSubmit: \u672A\u77E5\u7684\u64CD\u4F5C\u7C7B\u578B "+e);this.onCancel(),this.$emit("onSubmit")},onCancel(){const{formRef:e}=this.$refs;this.show=!1,e.resetFields()}},watch:{show:{immediate:!0,handler(e){e&&this.init()}}}},Ee={class:"dialog-footer"};function ve(e,t,r,m,n,s){const v=N,p=L,u=ce,g=me,C=M,b=I,y=ie;return c(),h(y,{modelValue:s.show,"onUpdate:modelValue":t[3]||(t[3]=i=>s.show=i),title:s.title,width:"600px","append-to-body":!0,"destroy-on-close":!0,"before-close":s.onCancel},{default:l(()=>[o(C,{ref:"formRef",model:n.form,rules:n.rules,"label-width":"90px",class:"form"},{default:l(()=>[o(p,{label:"\u53C2\u6570\u952E",prop:"k"},{default:l(()=>[o(v,{modelValue:n.form.k,"onUpdate:modelValue":t[0]||(t[0]=i=>n.form.k=i),placeholder:"\u8BF7\u8F93\u5165\u53C2\u6570\u952E"},null,8,["modelValue"])]),_:1}),o(p,{label:"\u53C2\u6570\u503C",prop:"v"},{default:l(()=>[o(v,{modelValue:n.form.v,"onUpdate:modelValue":t[1]||(t[1]=i=>n.form.v=i),placeholder:"\u8BF7\u8F93\u5165\u53C2\u6570\u503C"},null,8,["modelValue"])]),_:1}),o(p,{label:"\u72B6\u6001",prop:"remarks"},{default:l(()=>[o(g,{modelValue:n.form.enabled,"onUpdate:modelValue":t[2]||(t[2]=i=>n.form.enabled=i)},{default:l(()=>[(c(!0),U(q,null,j(n.system_global_status,i=>(c(),h(u,{key:i.v,label:i.v},{default:l(()=>[d(Q(i.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),footer:l(()=>[E("span",Ee,[o(b,{onClick:s.onCancel},{default:l(()=>[d("\u53D6\u6D88")]),_:1},8,["onClick"]),o(b,{type:"primary",onClick:s.onSubmit},{default:l(()=>[d(" \u786E\u8BA4 ")]),_:1},8,["onClick"])])]),_:1},8,["modelValue","title","before-close"])}const Ce=P(ke,[["render",ve]]),we={data(){return{showSearch:!0,editorBox:{show:!1,type:1,keys:[],ids:[]},tableData:[],pageIndex:1,pageSize:10,count:2}},computed:{checkedAll:{get(){return this.tableData.length===0?!1:this.tableData.every(t=>t.checked)},set(e){this.tableData.forEach(t=>t.checked=e)}},selectedRows(){return this.tableData.filter(e=>e.checked)},shouldDisabled(){return this.selectedRows.length===0}},methods:{...B(z,["resolveDictItemEnum"]),async init(){const e=await this.resolveDictItemEnum(["system_global_status"]),t=ae(e.system_global_status),r=await pe({current:this.pageIndex,size:this.pageSize,...this.searchQuery});r.records.forEach(m=>{m.checked=!1,m.status=t[m.status]}),this.count=r.total,this.tableData=r.records},async onRemoveRow({id:e}){T.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u53C2\u6570\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>O({id:e})).then(()=>{V.success("\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},async onBatchRemoveRow(){const e=this.selectedRows.filter(({type:t})=>t!==1);if(e.length===0)return V.error("\u7CFB\u7EDF\u5185\u7F6E\u7684\u53C2\u6570\u4E0D\u5141\u8BB8\u5220\u9664");T.confirm("\u60A8\u786E\u5B9A\u8981\u6279\u91CF\u5220\u9664\u9009\u4E2D\u7684\u53C2\u6570\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>Promise.all(e.map(({id:t})=>O({id:t})))).then(()=>{V.success("\u6279\u91CF\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},onPageChange(e,t){this.init()},onSearch(e){this.searchQuery=e,this.init()},onEditorChange(e,{id:t,k:r}={}){e===2&&(r=[r],t=[t]),this.editorBox.keys=r,this.editorBox.ids=t,this.editorBox.type=e,this.editorBox.show=!0}},components:{Filters:ye,ParamsEditorDialog:Ce},created(){this.searchQuery={},this.init()}},Se={class:"SystemParams"},Ve={class:"sys-table-action"},xe={class:"sys-table-main-actions"},Re={class:"sys-table-footer"},De=E("div",null,null,-1);function Be(e,t,r,m,n,s){const v=f("Filters"),p=f("Plus"),u=G,g=I,C=f("Delete"),b=f("Search"),y=ne,i=f("RefreshRight"),x=ue,k=ee,_=de,K=f("EditPen"),A=se,H=te,J=$,W=f("ParamsEditorDialog"),S=Y("auth");return c(),U("div",Se,[o(v,{show:n.showSearch,onOnSearch:s.onSearch},null,8,["show","onOnSearch"]),E("section",Ve,[E("div",null,[w((c(),h(g,{type:"primary",onClick:t[0]||(t[0]=a=>s.onEditorChange(1))},{default:l(()=>[o(u,null,{default:l(()=>[o(p)]),_:1}),d(" \u65B0\u589E ")]),_:1})),[[S,"system:config:add"]]),w((c(),h(g,{type:"danger",disabled:s.shouldDisabled,onClick:s.onBatchRemoveRow},{default:l(()=>[o(u,null,{default:l(()=>[o(C)]),_:1}),d(" \u5220\u9664 ")]),_:1},8,["disabled","onClick"])),[[S,"system:config:delete"]])]),E("div",null,[o(y,{class:"box-item",effect:"dark",content:`${n.showSearch?"\u9690\u85CF":"\u663E\u793A"}\u641C\u7D22`,placement:"top"},{default:l(()=>[o(g,{circle:"",plain:"",onClick:t[1]||(t[1]=a=>n.showSearch=!n.showSearch)},{default:l(()=>[o(u,null,{default:l(()=>[o(b)]),_:1})]),_:1})]),_:1},8,["content"]),o(y,{class:"box-item",effect:"dark",content:"\u5237\u65B0\u8868\u683C",placement:"top"},{default:l(()=>[o(g,{circle:"",plain:"",onClick:s.init},{default:l(()=>[o(u,null,{default:l(()=>[o(i)]),_:1})]),_:1},8,["onClick"])]),_:1})])]),w((c(),h(H,{data:n.tableData,style:{width:"100%"},stripe:"",border:""},{default:l(()=>[o(k,{width:"40"},{header:l(()=>[o(x,{modelValue:s.checkedAll,"onUpdate:modelValue":t[2]||(t[2]=a=>s.checkedAll=a)},null,8,["modelValue"])]),default:l(({row:a})=>[o(x,{modelValue:a.checked,"onUpdate:modelValue":R=>a.checked=R},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),o(k,{prop:"k",label:"\u952E\u540D",align:"center"}),o(k,{prop:"v",label:"\u952E\u503C",align:"center"}),o(k,{label:"\u542F\u7528\u72B6\u6001",align:"center"},{default:l(({row:a})=>[o(_,null,{default:l(()=>[d(Q(a.enabled===0?"\u7981\u7528":"\u542F\u7528"),1)]),_:2},1024)]),_:1}),o(k,{label:"\u64CD\u4F5C",align:"center"},{default:l(({row:a})=>[E("div",xe,[w((c(),h(A,{type:"primary",underline:!1,onClick:R=>s.onEditorChange(2,a)},{default:l(()=>[o(u,null,{default:l(()=>[o(K)]),_:1}),d(" \u4FEE\u6539 ")]),_:2},1032,["onClick"])),[[S,"system:config:update"]]),a.type!==1?w((c(),h(A,{key:0,type:"danger",underline:!1,style:{margin:"0 0 0 4px"},onClick:R=>s.onRemoveRow(a)},{default:l(()=>[o(u,null,{default:l(()=>[o(C)]),_:1}),d(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[S,"system:config:delete"]]):Z("",!0)])]),_:1})]),_:1},8,["data"])),[[S,"system:config:page"]]),E("div",Re,[De,o(J,{currentPage:n.pageIndex,"onUpdate:currentPage":t[3]||(t[3]=a=>n.pageIndex=a),"page-size":n.pageSize,"onUpdate:pageSize":t[4]||(t[4]=a=>n.pageSize=a),"page-sizes":[10,20,30,50],layout:"total, sizes, prev, pager, next, jumper",total:n.count,onSizeChange:t[5]||(t[5]=a=>s.onPageChange(n.pageIndex,a)),onCurrentChange:t[6]||(t[6]=a=>s.onPageChange(a,n.pageSize))},null,8,["currentPage","page-size","total"])]),o(W,{modelValue:n.editorBox.show,"onUpdate:modelValue":t[7]||(t[7]=a=>n.editorBox.show=a),type:n.editorBox.type,keys:n.editorBox.keys,ids:n.editorBox.ids,onOnSubmit:s.init},null,8,["modelValue","type","keys","ids","onOnSubmit"])])}const et=P(we,[["render",Be]]);export{et as default};
