import{bh as D,cn as X,bi as T,_ as F,r as V,o as d,a8 as h,w as a,aB as x,aC as Z,f as l,d as C,aA as N,F as R,h as y,E as O,b as $,c as Y,bE as v,d1 as ee,cw as te,ac as B,e as _,bD as U,c8 as M,ab as A,p as oe,i as le}from"./index.41bf9c1b.js";import{E as ae}from"./el-pagination.1e9489f1.js";import{E as j,a as q}from"./el-table-column.4b985531.js";import{E as H,a as L}from"./el-select.1fc6c445.js";import"./el-popper.7ae0c7d7.js";import{E as G}from"./el-link.e79f8a31.js";/* empty css                       *//* empty css                   */import{f as ne}from"./formatDate.66ef0a13.js";import"./el-collapse-transition.bb7c8a08.js";import{u as I}from"./EnumGlobalStore.f9b8c63d.js";import{E as re}from"./index.aa5a1392.js";import{E as J,a as Q}from"./index.39967f43.js";import{E as W}from"./el-dialog.db387371.js";import{E as se}from"./el-progress.2b839540.js";import{E as ie}from"./el-date-picker.79f6dda8.js";import{h as S}from"./moment.40bc58bf.js";import{E as me}from"./index.6f6ffc3e.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";import"./index.01c8af0b.js";import"./strings.2f51a18b.js";import"./castArray.422477ef.js";import"./index.5d666713.js";import"./refs.90407178.js";import"./cloneDeep.6e207ca9.js";import"./index.56404ca9.js";const de=e=>D({url:"/archives/page",loading:!0,data:e}),P=e=>D({url:"/archives/delete/"+e.id,loading:!0}),K=e=>D({url:"/archives/get/"+e.id,loading:!0}),ue=e=>X({url:"/archives/add",loading:!0,data:e}),ce=e=>D({url:"/company/page",loading:!0,data:e}),pe=e=>D({url:"/upload/deleteFile",loading:!0,data:e});const he={props:["show"],emits:["onSearch"],data(){return{form:{shortName:"",year:"",month:"",createName:""},industrys:[]}},methods:{...T(I,["resolveDictItemEnum"]),async init(){const e=await this.resolveDictItemEnum(["industrys"]);Object.assign(this,e)},handleReset(){this.$emit("onSearch",{}),this.$refs.formRef.resetFields()},handleSearch(){const e=Object.entries(this.form).reduce((t,[n,g])=>(g!==""&&(t[n]=g),t),{});this.$emit("onSearch",e)}},created(){this.init()}};function fe(e,t,n,g,o,r){const p=O,f=J,c=H,u=L,b=V("Search"),m=$,w=Y,E=V("Refresh"),k=Q,s=re;return d(),h(s,null,{default:a(()=>[x(l(k,{class:"sys-filters",ref:"formRef",inline:"",model:o.form},{default:a(()=>[l(f,{label:"\u4F01\u4E1A\u540D\u79F0",prop:"companyName"},{default:a(()=>[l(p,{placeholder:"\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0",clearable:"",modelValue:o.form.companyName,"onUpdate:modelValue":t[0]||(t[0]=i=>o.form.companyName=i)},null,8,["modelValue"])]),_:1}),l(f,{label:"\u6240\u5C5E\u884C\u4E1A",prop:"industry"},{default:a(()=>[l(u,{modelValue:o.form.industry,"onUpdate:modelValue":t[1]||(t[1]=i=>o.form.industry=i),placeholder:"\u8BF7\u9009\u62E9",clearable:""},{default:a(()=>[(d(!0),C(R,null,N(o.industrys,i=>(d(),h(c,{key:i.v,label:i.k,value:i.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(f,null,{default:a(()=>[l(w,{type:"primary",onClick:r.handleSearch},{default:a(()=>[l(m,null,{default:a(()=>[l(b)]),_:1}),y(" \u67E5\u8BE2 ")]),_:1},8,["onClick"]),l(w,{onClick:r.handleReset},{default:a(()=>[l(m,null,{default:a(()=>[l(E)]),_:1}),y(" \u91CD\u7F6E ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"]),[[Z,n.show]])]),_:1})}const _e=F(he,[["render",fe],["__scopeId","data-v-2dd23fed"]]);const ye={props:["modelValue","type","ids"],emits:["update:modelValue","onSubmit"],data(){return{form:{companyId:"",endTime:null,fileName:"",newFileName:"",remark:"",startTime:null,type:"",time:null,url:""},system_global_status:[],rules:{companyId:{required:!0,message:"\u8BF7\u9009\u62E9\u4F01\u4E1A\u540D\u79F0",trigger:"change"},type:[{required:!0,message:"\u8BF7\u9009\u62E9\u6587\u4EF6\u7C7B\u578B",trigger:"change"}],newFileName:[{required:!0,message:"\u8BF7\u586B\u5199\u6587\u4EF6\u540D\u79F0",trigger:"change"}],url:[{required:!0,message:"\u8BF7\u4E0A\u4F20\u9644\u4EF6",trigger:"change"}]},company:[],file_type:[]}},computed:{show:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}},title(){return"\u65B0\u589E\u6863\u6848\u6587\u4EF6"}},mounted(){this.initCompany(),this.getFileType()},methods:{...T(I,["resolveDictItemEnum"]),handleExceed(e,t){this.$message.warning("\u5F53\u524D\u9650\u5236\u9009\u62E9 1 \u4E2A\u6587\u4EF6")},async handleRemove(e){await pe({url:this.form.url}),v.success("\u5220\u9664\u6210\u529F")},async importHandle({file:e}){const t=await ee({file:e});this.form.url=t.url,this.form.fileName=t.originalFileName,this.$refs.formRef.clearValidate("url"),v.success("\u4E0A\u4F20\u6210\u529F")},async initCompany(){const{records:e}=await ce({current:1,size:200});this.company=e.map(t=>{var n={value:t.id,label:t.name};return n})},async getFileType(){},async init(){if(this.type===2){const e=await K({id:this.ids[0]});Object.assign(this.form,{...e,month:`${e.year}-${e.month}`})}},async invokeCreate(){var e=JSON.parse(JSON.stringify(this.form));e.time&&(e.time=S(e.time).format("YYYY-MM-DD HH:mm:ss")),e.type==1&&e.startTime&&(e.startTime=S(e.startTime).format("YYYY-MM-DD HH:mm:ss"),e.time=e.startTime),e.type==1&&e.startTime&&(e.endTime=S(e.endTime).format("YYYY-MM-DD HH:mm:ss")),await ue(e),v.success("\u521B\u5EFA\u4F01\u4E1A\u80FD\u8017\u6210\u529F")},async invokeUpdate(e){var t=this.form;if(t.id=e,this.form.month){var n=S(this.form.month).format("YYYY-MM"),g=n.split("-");t.year=g[0],t.month=g[1]}this.form.companyId&&(t.shortName=this.company.find(o=>o.value==this.form.companyId).label),await ApiPostUpdate(t),v.success("\u4FEE\u6539\u4F01\u4E1A\u80FD\u8017\u6210\u529F")},async onSubmit(){try{const{formRef:t}=this.$refs;await t.validate()}catch{return}if(!this.form.url)return v.error("\u8BF7\u4E0A\u4F20\u9644\u4EF6");const{type:e}=this;if(e===1)await this.invokeCreate();else if(e===2)await this.invokeUpdate(this.ids[0]);else if(e===3)await Promise.all(this.ids.map(this.invokeUpdate));else return console.error("SystemPost->EditorDialog->onSubmit: \u672A\u77E5\u7684\u64CD\u4F5C\u7C7B\u578B "+e);this.onCancel(),this.$emit("onSubmit")},onCancel(){const{formRef:e}=this.$refs;this.show=!1,e.resetFields()},formatInputNumber:te},watch:{show:{immediate:!0,handler(e){e&&this.init()}}}},ge={class:"upload-btn"},be={class:"dialog-footer"};function ve(e,t,n,g,o,r){const p=H,f=L,c=J,u=ie,b=O,m=Y,w=se,E=Q,k=W;return d(),h(k,{modelValue:r.show,"onUpdate:modelValue":t[7]||(t[7]=s=>r.show=s),title:r.title,width:"600px","append-to-body":!0,"destroy-on-close":!0,"before-close":r.onCancel},{default:a(()=>[l(E,{ref:"formRef",model:o.form,rules:o.rules,"label-width":"100px",class:"form"},{default:a(()=>[l(c,{label:"\u4F01\u4E1A\u540D\u79F0\uFF1A",prop:"companyId"},{default:a(()=>[l(f,{modelValue:o.form.companyId,"onUpdate:modelValue":t[0]||(t[0]=s=>o.form.companyId=s),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9"},{default:a(()=>[(d(!0),C(R,null,N(o.company,s=>(d(),h(p,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(c,{label:"\u6587\u4EF6\u7C7B\u578B\uFF1A",prop:"type"},{default:a(()=>[l(f,{modelValue:o.form.type,"onUpdate:modelValue":t[1]||(t[1]=s=>o.form.type=s),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9"},{default:a(()=>[(d(!0),C(R,null,N(o.file_type,s=>(d(),h(p,{key:s.v,label:s.k,value:s.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o.form.type!=1?(d(),h(c,{key:0,label:"\u65F6\u95F4",prop:"time"},{default:a(()=>[l(u,{modelValue:o.form.time,"onUpdate:modelValue":t[2]||(t[2]=s=>o.form.time=s),type:"datetime",placeholder:"\u9009\u62E9\u65F6\u95F4"},null,8,["modelValue"])]),_:1})):B("",!0),o.form.type==1?(d(),h(c,{key:1,label:"\u5F00\u59CB\u65F6\u95F4",prop:"startTime"},{default:a(()=>[l(u,{modelValue:o.form.startTime,"onUpdate:modelValue":t[3]||(t[3]=s=>o.form.startTime=s),type:"datetime",placeholder:"\u5F00\u59CB\u65F6\u95F4"},null,8,["modelValue"])]),_:1})):B("",!0),o.form.type==1?(d(),h(c,{key:2,label:"\u7ED3\u675F\u65F6\u95F4",prop:"endTime"},{default:a(()=>[l(u,{modelValue:o.form.endTime,"onUpdate:modelValue":t[4]||(t[4]=s=>o.form.endTime=s),type:"datetime",placeholder:"\u7ED3\u675F\u65F6\u95F4"},null,8,["modelValue"])]),_:1})):B("",!0),l(c,{label:"\u6587\u4EF6\u540D\u79F0\uFF1A",prop:"newFileName"},{default:a(()=>[l(b,{class:"input",modelValue:o.form.newFileName,"onUpdate:modelValue":t[5]||(t[5]=s=>o.form.newFileName=s),placeholder:"\u8BF7\u8F93\u5165\u6587\u4EF6\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(c,{label:"\u9644\u4EF6\uFF1A",prop:"url"},{default:a(()=>[l(w,{action:"",style:{width:"400px"},"on-change":e.fileChange,class:"upload",ref:"upload","on-remove":r.handleRemove,"before-remove":e.beforeRemove,multiple:"",limit:1,"on-exceed":r.handleExceed,"file-list":e.fileList,"http-request":r.importHandle},{default:a(()=>[_("div",ge,[l(m,{size:"small",type:"primary"},{default:a(()=>[y("\u70B9\u51FB\u4E0A\u4F20")]),_:1})])]),_:1},8,["on-change","on-remove","before-remove","on-exceed","file-list","http-request"])]),_:1}),l(c,{label:"\u5907\u6CE8\uFF1A",prop:"remark"},{default:a(()=>[l(b,{modelValue:o.form.remark,"onUpdate:modelValue":t[6]||(t[6]=s=>o.form.remark=s),type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8",maxlength:200,"show-word-limit":"",class:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),footer:a(()=>[_("span",be,[l(m,{onClick:r.onCancel},{default:a(()=>[y("\u53D6\u6D88")]),_:1},8,["onClick"]),l(m,{type:"primary",onClick:r.onSubmit},{default:a(()=>[y(" \u786E\u8BA4 ")]),_:1},8,["onClick"])])]),_:1},8,["modelValue","title","before-close"])}const we=F(ye,[["render",ve],["__scopeId","data-v-e432bae5"]]);const xe={props:["modelValue","row"],data(){return{file_type:[],tableData:[],pageIndex:1,pageSize:10,count:2}},computed:{show:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}},title(){return"\u8BE6\u60C5"}},mounted(){this.getFileType()},methods:{...T(I,["resolveDictItemEnum"]),async getFileType(){const e=await this.resolveDictItemEnum(["file_type"]);Object.assign(this,e)},fileTypeFormat(e){let t="";return this.file_type.forEach(n=>{e.type==n.v&&(t=n.k)}),t},async init(){const e=await K({id:this.row.companyId});this.total=e.length,this.tableData=e.map(t=>(t.url=`/api${t.url}`,t))},async onRemoveRow({id:e}){U.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u6570\u636E\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>P({id:e})).then(()=>{v.success("\u5220\u9664\u6210\u529F"),this.init(),this.$emit("refrash")}).catch(()=>null)}},watch:{show:{immediate:!0,handler(e){e&&this.init()}}}},Ee={class:"company"},ke={class:"sys-table-main-actions"};function Ve(e,t,n,g,o,r){const p=j,f=G,c=q,u=W,b=M("auth");return d(),h(u,{modelValue:r.show,"onUpdate:modelValue":t[0]||(t[0]=m=>r.show=m),title:r.title,width:"1000px","append-to-body":!0,"destroy-on-close":!0,"before-close":e.onCancel},{default:a(()=>[_("div",Ee,"\u4F01\u4E1A\u540D\u79F0\uFF1A"+A(n.row.companyName),1),l(c,{data:o.tableData,"header-cell-style":e.thStyle},{default:a(()=>[l(p,{width:"80",index:e.indexAdd,label:"\u5E8F\u53F7",align:"center",type:"index"},null,8,["index"]),l(p,{prop:"newFileName",label:"\u6587\u4EF6\u540D\u79F0",align:"center"}),l(p,{prop:"industryName",label:"\u6587\u4EF6\u7C7B\u578B",align:"center",formatter:r.fileTypeFormat},null,8,["formatter"]),l(p,{prop:"time",label:"\u65F6\u95F4",align:"center"},{default:a(({row:m})=>[y(A(m.type==1?`${m.startTime?m.startTime:""}${m.endTime?"~"+m.endTime:""}`:m.time),1)]),_:1}),l(p,{prop:"remark",label:"\u5907\u6CE8",align:"center",formatter:e.areaFormat},null,8,["formatter"]),l(p,{prop:"createTime",label:"\u521B\u5EFA\u65F6\u95F4",align:"center"}),l(p,{label:"\u64CD\u4F5C",align:"center",width:"200",fixed:"right"},{default:a(({row:m})=>[_("div",ke,[x((d(),h(f,{type:"primary",underline:!1,href:m.url,target:"_blank"},{default:a(()=>[y(" \u4E0B\u8F7D ")]),_:2},1032,["href"])),[[b,"document:list:download"]]),x((d(),h(f,{type:"danger",underline:!1,style:{margin:"0 0 0 14px"},onClick:w=>r.onRemoveRow(m)},{default:a(()=>[y(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[b,"document:list:delete"]])])]),_:1})]),_:1},8,["data","header-cell-style"])]),_:1},8,["modelValue","title","before-close"])}const De=F(xe,[["render",Ve],["__scopeId","data-v-21e390cb"]]);const Se={data(){return{thStyle:{color:"#9E9FA0",fontWeight:"100"},showSearch:!0,detailBox:{show:!1,ids:[]},editorBox:{show:!1,type:1,ids:[]},uploadBox:{show:!1},tableData:[],pageIndex:1,pageSize:10,count:2,company_type:[],industrys:[],system_area:[]}},computed:{checkedAll:{get(){const e=this.tableData;return e.length===0?!1:e.every(t=>t.checked)},set(e){this.tableData.forEach(t=>t.checked=e)}},selectedRows(){return this.tableData.filter(e=>e.checked)},shouldDisabled(){return this.selectedRows.length===0}},methods:{...T(I,["resolveDictItemEnum"]),async init(){const e=await de({...this.searchQuery,current:this.pageIndex,size:this.pageSize});this.pageIndex=e.current,this.pageSize=e.size,this.count=e.total,this.tableData=e.records.map(t=>{const{updateTime:n}=t;return n&&(t.updateTime=ne("YYYY-MM-DD",n)),t.industryName=this.industryFormat(t),t.areaName=this.areaFormat(t),t})},industryFormat(e){let t="";return this.industrys.forEach(n=>{e.industry==n.v&&(t=n.k)}),t},typeFormat(e){let t="";return this.company_type.forEach(n=>{e.type==n.v&&(t=n.k)}),t},areaFormat(e){let t="";return this.system_area.forEach(n=>{e.area==n.v&&(t=n.k)}),t},async getIndustrys(){const e=await this.resolveDictItemEnum(["industrys"]);Object.assign(this,e)},async getSystemArea(){const e=await this.resolveDictItemEnum(["system_area"]);Object.assign(this,e)},async getCompanyType(){const e=await this.resolveDictItemEnum(["company_type"]);Object.assign(this,e)},industryFormat(e){let t="";return this.industrys.forEach(n=>{e.industry==n.v&&(t=n.k)}),t},typeFormat(e){let t="";return this.company_type.forEach(n=>{e.type==n.v&&(t=n.k)}),t},areaFormat(e){let t="";return this.system_area.forEach(n=>{e.area==n.v&&(t=n.k)}),t},async onRemoveRow({id:e}){U.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u6570\u636E\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>P({id:e})).then(()=>{v.success("\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},async onBatchRemoveRow(){U.confirm("\u60A8\u786E\u5B9A\u8981\u6279\u91CF\u5220\u9664\u9009\u4E2D\u7684\u6570\u636E\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>Promise.all(this.selectedRows.map(({id:e})=>P({id:e})))).then(()=>{v.success("\u6279\u91CF\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},onSearch(e){this.searchQuery=e,this.init()},onEditorChange(e,t){this.editorBox.show=!0,this.editorBox.ids=e,this.editorBox.type=type},onDetailChange(e){this.detailBox.show=!0,this.detailBox.row=e},onUploadChange(){this.uploadBox.show=!0},upload(){},onPageChange(e,t){this.init()},indexAdd(e){return e+1+(this.pageIndex-1)*this.pageSize},refrash(){this.init()}},components:{Filters:_e,PostEditorDialog:we,DetailDialog:De},created(){this.init(),this.getIndustrys(),this.getSystemArea()}},Ce=e=>(oe("data-v-3d2e372e"),e=e(),le(),e),Te={class:"SystemPost"},Fe={class:"table-content"},Ie={class:"sys-table-action"},Be={class:"sys-table-main-actions"},Ne={class:"sys-table-footer"},Re=Ce(()=>_("div",null,null,-1));function Ue(e,t,n,g,o,r){const p=V("Filters"),f=Y,c=me,u=j,b=G,m=q,w=ae,E=V("PostEditorDialog"),k=V("DetailDialog"),s=M("auth");return d(),C("div",Te,[l(p,{show:o.showSearch,onOnSearch:r.onSearch},null,8,["show","onOnSearch"]),_("div",Fe,[_("section",Ie,[_("div",null,[x((d(),h(f,{type:"primary",onClick:t[0]||(t[0]=i=>r.onEditorChange(1))},{default:a(()=>[y(" \u6863\u6848\u5B58\u6863 ")]),_:1})),[[s,"document:list:add"]])])]),x((d(),h(m,{data:o.tableData,stripe:"","header-cell-style":o.thStyle},{default:a(()=>[l(u,{width:"40"},{header:a(()=>[l(c,{modelValue:r.checkedAll,"onUpdate:modelValue":t[1]||(t[1]=i=>r.checkedAll=i)},null,8,["modelValue"])]),default:a(({row:i})=>[l(c,{modelValue:i.checked,"onUpdate:modelValue":z=>i.checked=z},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{width:"80",index:r.indexAdd,label:"\u5E8F\u53F7",align:"center",type:"index"},null,8,["index"]),l(u,{prop:"companyName",label:"\u4F01\u4E1A\u540D\u79F0",align:"center"}),l(u,{prop:"industryName",label:"\u6240\u5C5E\u884C\u4E1A",align:"center",formatter:r.industryFormat},null,8,["formatter"]),l(u,{prop:"areaName",label:"\u884C\u653F\u533A\u57DF",align:"center",formatter:r.areaFormat},null,8,["formatter"]),l(u,{prop:"counts",label:"\u6587\u4EF6\u6570\u91CF",align:"center"}),l(u,{prop:"updateTime",label:"\u66F4\u65B0\u65F6\u95F4",align:"center"}),l(u,{label:"\u64CD\u4F5C",align:"center",width:"200",fixed:"right"},{default:a(({row:i})=>[_("div",Be,[x((d(),h(b,{type:"primary",underline:!1,onClick:z=>r.onDetailChange(i)},{default:a(()=>[y(" \u8BE6\u60C5 ")]),_:2},1032,["onClick"])),[[s,"document:list:detail"]])])]),_:1})]),_:1},8,["data","header-cell-style"])),[[s,"document:list:page"]]),_("div",Ne,[Re,l(w,{currentPage:o.pageIndex,"onUpdate:currentPage":t[2]||(t[2]=i=>o.pageIndex=i),"page-size":o.pageSize,"onUpdate:pageSize":t[3]||(t[3]=i=>o.pageSize=i),"page-sizes":[10,20,30,50],layout:"total, sizes, prev, pager, next, jumper",total:o.count,onSizeChange:t[4]||(t[4]=i=>r.onPageChange(o.pageIndex,i)),onCurrentChange:t[5]||(t[5]=i=>r.onPageChange(i,o.pageSize))},null,8,["currentPage","page-size","total"])])]),l(E,{modelValue:o.editorBox.show,"onUpdate:modelValue":t[6]||(t[6]=i=>o.editorBox.show=i),type:o.editorBox.type,ids:o.editorBox.ids,record:o.editorBox.record,company_type:o.company_type,industrys:o.industrys,system_area:o.system_area,onOnSubmit:r.init},null,8,["modelValue","type","ids","record","company_type","industrys","system_area","onOnSubmit"]),l(k,{modelValue:o.detailBox.show,"onUpdate:modelValue":t[7]||(t[7]=i=>o.detailBox.show=i),row:o.detailBox.row,onRefrash:r.refrash},null,8,["modelValue","row","onRefrash"])])}const mt=F(Se,[["render",Ue],["__scopeId","data-v-3d2e372e"]]);export{mt as default};
