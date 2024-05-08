import{bh as I,cn as q,bi as B,_ as z,r as b,o as d,a8 as g,w as n,aB as E,aC as Q,f as e,d as j,aA as N,F as P,h as k,E as H,b as L,c as U,e as l,ab as u,p as K,i as X,bD as G,bE as F,c8 as J}from"./index.41bf9c1b.js";import{E as W}from"./el-pagination.1e9489f1.js";import{E as Z,a as $}from"./el-table-column.4b985531.js";import{E as ee,a as te}from"./el-select.1fc6c445.js";import{a as oe}from"./el-popper.7ae0c7d7.js";import{E as le}from"./el-link.e79f8a31.js";/* empty css                       *//* empty css                   */import{u as A,b as se}from"./EnumGlobalStore.f9b8c63d.js";import"./el-collapse-transition.bb7c8a08.js";import{E as ne}from"./el-date-picker.79f6dda8.js";import{E as ae}from"./index.aa5a1392.js";import{E as ie,a as ce}from"./index.39967f43.js";import{E as re}from"./el-dialog.db387371.js";import{E as _e}from"./index.6f6ffc3e.js";import{E as me}from"./index.01c8af0b.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";import"./strings.2f51a18b.js";import"./castArray.422477ef.js";import"./index.5d666713.js";import"./index.56404ca9.js";import"./refs.90407178.js";const de=s=>I({url:"/task/logger/page",data:s,loading:!0}),ue=s=>I({url:"/task/logger/get/"+s.id,loading:!0}),pe=s=>q({url:"/task/logger/delete",data:s,loading:!0}),he=s=>I({url:"/task/logger/clean",loading:!0}),fe={props:["show"],emits:["onSearch"],data(){return{form:{jobName:"",jobGroup:"",status:"",date:[]},system_global_taskgroup:[],system_global_expstatus:[]}},methods:{...B(A,["resolveDictItemEnum"]),async init(){const s=await this.resolveDictItemEnum(["system_global_taskgroup","system_global_expstatus"]);Object.assign(this,s)},handleReset(){this.$emit("onSearch",{}),this.$refs.formRef.resetFields()},handleSearch(){const{jobName:s,jobGroup:t,status:r,date:_}=this.form,o=Object.entries({jobName:s,jobGroup:t,status:r,beginTime:_[0],endTime:_[1]}).reduce((a,[w,m])=>(m!==""&&m!==void 0&&(a[w]=m),a),{});this.$emit("onSearch",o)}},created(){this.init()}};function ge(s,t,r,_,o,a){const w=H,m=ie,p=ee,x=te,S=ne,D=b("Search"),C=L,y=U,h=b("Refresh"),T=ce,V=ae;return d(),g(V,null,{default:n(()=>[E(e(T,{class:"mon-filters",ref:"formRef",inline:"",model:o.form},{default:n(()=>[e(m,{label:"\u4EFB\u52A1\u540D\u79F0",prop:"jobName"},{default:n(()=>[e(w,{placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0",clearable:"",modelValue:o.form.jobName,"onUpdate:modelValue":t[0]||(t[0]=c=>o.form.jobName=c)},null,8,["modelValue"])]),_:1}),e(m,{label:"\u4EFB\u52A1\u7EC4\u540D",prop:"jobGroup"},{default:n(()=>[e(x,{placeholder:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u7EC4\u540D",clearable:"",modelValue:o.form.jobGroup,"onUpdate:modelValue":t[1]||(t[1]=c=>o.form.jobGroup=c)},{default:n(()=>[(d(!0),j(P,null,N(o.system_global_taskgroup,c=>(d(),g(p,{key:c.k,label:c.k,value:c.k},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"\u6267\u884C\u72B6\u6001",prop:"status"},{default:n(()=>[e(x,{placeholder:"\u8BF7\u9009\u62E9\u6267\u884C\u72B6\u6001",clearable:"",modelValue:o.form.concurrent,"onUpdate:modelValue":t[2]||(t[2]=c=>o.form.concurrent=c)},{default:n(()=>[(d(!0),j(P,null,N(o.system_global_expstatus,c=>(d(),g(p,{key:c.v,label:c.k,value:c.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"\u64CD\u4F5C\u65F6\u95F4",prop:"date"},{default:n(()=>[e(S,{modelValue:o.form.date,"onUpdate:modelValue":t[3]||(t[3]=c=>o.form.date=c),type:"datetimerange","range-separator":"-","start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4",clearable:"","value-format":"YYYY-MM-DD HH:mm:ss","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)]},null,8,["modelValue","default-time"])]),_:1}),e(m,null,{default:n(()=>[e(y,{type:"primary",onClick:a.handleSearch},{default:n(()=>[e(C,null,{default:n(()=>[e(D)]),_:1}),k(" \u641C\u7D22 ")]),_:1},8,["onClick"]),e(y,{onClick:a.handleReset},{default:n(()=>[e(C,null,{default:n(()=>[e(h)]),_:1}),k(" \u91CD\u7F6E ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"]),[[Q,r.show]])]),_:1})}const be=z(fe,[["render",ge]]);const ke={props:["show","id"],emits:["update:show"],data(){return{detail:{}}},computed:{_show:{get(){return this.show},set(s){this.$emit("update:show",s)}}},methods:{...B(A,["resolveDictItemEnum"]),async init(){const s=await this.resolveDictItemEnum(["system_global_expstatus"]),t=se(s.system_global_expstatus),r=await ue({id:this.id});Object.assign(this.detail,{...r,status:t[r.status]})},onCancel(){this._show=!1,this.detail={}}},watch:{show:{immediate:!0,handler(s){s&&this.init()}}}},f=s=>(K("data-v-fd442cfd"),s=s(),X(),s),we={class:"dialog-content"},xe={class:"item"},Ee=f(()=>l("span",{class:"item-label el-form-item__label"},"\u4EFB\u52A1ID",-1)),ve={class:"content el-form-item__content"},ye={class:"item"},De=f(()=>l("span",{class:"item-label el-form-item__label"},"\u4EFB\u52A1\u5206\u7EC4",-1)),Ce={class:"content el-form-item__content"},Se={class:"item"},Te=f(()=>l("span",{class:"item-label el-form-item__label"},"\u4EFB\u52A1\u540D\u79F0",-1)),Ve={class:"content el-form-item__content"},Re={class:"item"},je=f(()=>l("span",{class:"item-label el-form-item__label"},"\u8C03\u7528\u5B57\u7B26\u4E32",-1)),Ie={class:"content el-form-item__content"},Be={class:"item"},ze=f(()=>l("span",{class:"item-label el-form-item__label"},"\u65E5\u5FD7\u6D88\u606F",-1)),Ue={class:"content el-form-item__content"},Ae={class:"item"},Ne=f(()=>l("span",{class:"item-label el-form-item__label"},"\u6267\u884C\u72B6\u6001",-1)),Pe={class:"content el-form-item__content"},Ge={class:"item"},Fe=f(()=>l("span",{class:"item-label el-form-item__label"},"\u5F00\u59CB\u65F6\u95F4",-1)),Le={class:"content el-form-item__content"},Me={class:"item"},Oe=f(()=>l("span",{class:"item-label el-form-item__label"},"\u7ED3\u675F\u65F6\u95F4",-1)),Ye={class:"content el-form-item__content"},qe={class:"item"},Qe=f(()=>l("span",{class:"item-label el-form-item__label"},"\u521B\u5EFA\u65F6\u95F4",-1)),He={class:"content el-form-item__content"},Ke={class:"item item-code"},Xe=f(()=>l("span",{class:"item-label el-form-item__label"},"\u5F02\u5E38\u4FE1\u606F",-1)),Je={class:"content el-form-item__content"};function We(s,t,r,_,o,a){const w=U,m=re;return d(),g(m,{modelValue:a._show,"onUpdate:modelValue":t[0]||(t[0]=p=>a._show=p),title:"\u8C03\u5EA6\u65E5\u5FD7\u8BE6\u60C5",width:"800px","append-to-body":!0,"destroy-on-close":!0,"before-close":a.onCancel},{default:n(()=>[l("div",we,[l("section",xe,[Ee,l("span",ve,u(o.detail.id),1)]),l("section",ye,[De,l("span",Ce,u(o.detail.jobGroup),1)]),l("section",Se,[Te,l("span",Ve,u(o.detail.jobName),1)]),l("section",Re,[je,l("span",Ie,u(o.detail.invokeTarget),1)]),l("section",Be,[ze,l("span",Ue,u(o.detail.jobMessage),1)]),l("section",Ae,[Ne,l("span",Pe,u(o.detail.status),1)]),l("section",Ge,[Fe,l("span",Le,u(o.detail.startTime),1)]),l("section",Me,[Oe,l("span",Ye,u(o.detail.stopTime),1)]),l("section",qe,[Qe,l("span",He,u(o.detail.createTime),1)]),l("section",Ke,[Xe,l("span",Je,[l("code",null,u(o.detail.exceptionInfo),1)])])])]),footer:n(()=>[e(w,{onClick:a.onCancel},{default:n(()=>[k("\u53D6\u6D88")]),_:1},8,["onClick"])]),_:1},8,["modelValue","before-close"])}const Ze=z(ke,[["render",We],["__scopeId","data-v-fd442cfd"]]),$e={data(){return{showSearch:!0,detailBox:{show:!1,id:-10},tableData:[],pageIndex:1,pageSize:10,count:2}},computed:{checkedAll:{get(){return this.tableData.length===0?!1:this.tableData.every(t=>t.checked)},set(s){this.tableData.forEach(t=>t.checked=s)}},selectedRows(){return this.tableData.filter(s=>s.checked)},shouldDisabled(){return this.selectedRows.length===0}},methods:{...B(A,["resolveDictItemEnum"]),async init(){const{system_global_expstatus:s}=await this.resolveDictItemEnum(["system_global_expstatus"]),t={};for(const _ of s)t[_.v]=_.k;const r=await de({current:this.pageIndex,size:this.pageSize,...this.searchQuery});r.records.forEach(_=>{_.checked=!1,_.status=t[_.status]}),this.count=r.total,this.tableData=r.records},async onRemoveRow(s,t){let r;s===1?r=[t.id]:s===2&&(r=this.selectedRows.map(_=>_.id)),G.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>pe(r)).then(()=>{F.success("\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},async onCleanRow(){return G.confirm("\u60A8\u786E\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u8C03\u5EA6\u65E5\u5FD7\u5417?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(he).then(()=>F.success("\u6E05\u7A7A\u6210\u529F")).then(()=>this.init()).catch(()=>null)},onPageChange(s,t){this.init()},onSearch(s){this.searchQuery=s,this.init()},onDetailBoxChange(s){this.detailBox.show=!0,this.detailBox.id=s.id}},components:{Filters:be,TimingDetailDialog:Ze},created(){this.searchQuery={},this.init()}},et={class:"MonitorTimingLog"},tt={class:"mon-table-action"},ot={class:"mon-table-main-actions"},lt={class:"mon-table-footer"},st=l("div",null,null,-1);function nt(s,t,r,_,o,a){const w=b("Filters"),m=b("Delete"),p=L,x=U,S=b("Search"),D=oe,C=b("RefreshRight"),y=_e,h=Z,T=me,V=b("View"),c=le,M=$,O=W,Y=b("TimingDetailDialog"),v=J("auth");return d(),j("div",et,[e(w,{show:o.showSearch,onOnSearch:a.onSearch},null,8,["show","onOnSearch"]),l("section",tt,[l("div",null,[E((d(),g(x,{type:"danger",disabled:a.shouldDisabled,onClick:t[0]||(t[0]=i=>a.onRemoveRow(2))},{default:n(()=>[e(p,null,{default:n(()=>[e(m)]),_:1}),k(" \u5220\u9664 ")]),_:1},8,["disabled"])),[[v,"task:logger:delete"]]),E((d(),g(x,{type:"danger",onClick:a.onCleanRow},{default:n(()=>[k(" \u6E05\u7A7A ")]),_:1},8,["onClick"])),[[v,"task:logger:clean"]])]),l("div",null,[e(D,{class:"box-item",effect:"dark",content:`${o.showSearch?"\u9690\u85CF":"\u663E\u793A"}\u641C\u7D22`,placement:"top"},{default:n(()=>[e(x,{circle:"",plain:"",onClick:t[1]||(t[1]=i=>o.showSearch=!o.showSearch)},{default:n(()=>[e(p,null,{default:n(()=>[e(S)]),_:1})]),_:1})]),_:1},8,["content"]),e(D,{class:"box-item",effect:"dark",content:"\u5237\u65B0\u8868\u683C",placement:"top"},{default:n(()=>[e(x,{circle:"",plain:"",onClick:a.init},{default:n(()=>[e(p,null,{default:n(()=>[e(C)]),_:1})]),_:1},8,["onClick"])]),_:1})])]),E((d(),g(M,{data:o.tableData,style:{width:"100%"},class:"table",stripe:"",border:""},{default:n(()=>[e(h,{width:"40"},{header:n(()=>[e(y,{modelValue:a.checkedAll,"onUpdate:modelValue":t[2]||(t[2]=i=>a.checkedAll=i)},null,8,["modelValue"])]),default:n(({row:i})=>[e(y,{modelValue:i.checked,"onUpdate:modelValue":R=>i.checked=R},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),e(h,{prop:"jobName",label:"\u4EFB\u52A1\u540D\u79F0",align:"center"}),e(h,{prop:"jobGroup",label:"\u4EFB\u52A1\u7EC4\u540D",align:"center"}),e(h,{prop:"invokeTarget",label:"\u8C03\u7528\u5B57\u7B26\u4E32",align:"center"}),e(h,{prop:"jobMessage",label:"\u65E5\u5FD7\u4FE1\u606F",align:"center"}),e(h,{label:"\u6267\u884C\u72B6\u6001",align:"center"},{default:n(({row:i})=>[e(T,null,{default:n(()=>[k(u(i.status),1)]),_:2},1024)]),_:1}),e(h,{prop:"startTime",label:"\u5F00\u59CB\u65F6\u95F4",align:"center"}),e(h,{label:"\u64CD\u4F5C",align:"center"},{default:n(({row:i})=>[l("div",ot,[E((d(),g(c,{type:"primary",underline:!1,onClick:R=>a.onDetailBoxChange(i)},{default:n(()=>[e(p,null,{default:n(()=>[e(V)]),_:1}),k(" \u8BE6\u60C5 ")]),_:2},1032,["onClick"])),[[v,"task:logger:query"]]),E((d(),g(c,{type:"danger",underline:!1,style:{margin:"0 4px 0 4px"},onClick:R=>a.onRemoveRow(1,i)},{default:n(()=>[e(p,null,{default:n(()=>[e(m)]),_:1}),k(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[v,"task:logger:delete"]])])]),_:1})]),_:1},8,["data"])),[[v,"task:logger:list"]]),l("div",lt,[st,l("div",null,[E(e(O,{currentPage:o.pageIndex,"onUpdate:currentPage":t[3]||(t[3]=i=>o.pageIndex=i),"page-size":o.pageSize,"onUpdate:pageSize":t[4]||(t[4]=i=>o.pageSize=i),"page-sizes":[10,20,30,50],layout:"total, sizes, prev, pager, next, jumper",total:o.count,onSizeChange:t[5]||(t[5]=i=>a.onPageChange(o.pageIndex,i)),onCurrentChange:t[6]||(t[6]=i=>a.onPageChange(i,o.pageSize))},null,8,["currentPage","page-size","total"]),[[v,"task:logger:list"]])])]),e(Y,{show:o.detailBox.show,"onUpdate:show":t[7]||(t[7]=i=>o.detailBox.show=i),id:o.detailBox.id},null,8,["show","id"])])}const Vt=z($e,[["render",nt]]);export{Vt as default};
