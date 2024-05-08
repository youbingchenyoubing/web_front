import{bi as R,_ as P,r as b,o as u,a8 as g,w as s,aB as V,aC as J,f as t,d as B,aA as O,F,h as _,E as Y,b as j,c as U,bE as x,cw as W,ab as M,e as E,bD as T,c8 as X}from"./index.41bf9c1b.js";import{E as Z}from"./el-pagination.1e9489f1.js";import{E as $,a as ee}from"./el-table-column.4b985531.js";import{E as te,a as oe}from"./el-select.1fc6c445.js";import{a as le}from"./el-popper.7ae0c7d7.js";import{E as se}from"./el-link.e79f8a31.js";/* empty css                       *//* empty css                   */import{f as z}from"./formatDate.66ef0a13.js";import{a as ne,b as ae,c as re,d as ie,e as A}from"./index.506ec3c4.js";import"./el-collapse-transition.bb7c8a08.js";import{u as I,b as me}from"./EnumGlobalStore.f9b8c63d.js";import{E as de}from"./index.aa5a1392.js";import{E as q,a as G}from"./index.39967f43.js";import{E as ue}from"./el-dialog.db387371.js";/* empty css                       */import{E as ce,a as pe}from"./el-radio.4d7862e0.js";import{E as _e}from"./index.6f6ffc3e.js";import{E as fe}from"./index.01c8af0b.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";import"./strings.2f51a18b.js";import"./castArray.422477ef.js";import"./index.5d666713.js";import"./refs.90407178.js";const he={props:["show"],emits:["onSearch"],data(){return{form:{postName:"",postCode:"",enabled:""},system_global_status:[]}},methods:{...R(I,["resolveDictItemEnum"]),async init(){const o=await this.resolveDictItemEnum(["system_global_status"]);Object.assign(this,o)},handleReset(){this.$emit("onSearch",{}),this.$refs.formRef.resetFields()},handleSearch(){const o=Object.entries(this.form).reduce((e,[m,i])=>(i!==""&&(e[m]=i),e),{});this.$emit("onSearch",o)}},created(){this.init()}};function be(o,e,m,i,l,n){const f=Y,d=q,p=te,y=oe,w=b("Search"),k=j,C=U,r=b("Refresh"),v=G,h=de;return u(),g(h,null,{default:s(()=>[V(t(v,{class:"sys-filters",ref:"formRef",inline:"",model:l.form},{default:s(()=>[t(d,{label:"\u5C97\u4F4D\u540D\u79F0",prop:"postName"},{default:s(()=>[t(f,{placeholder:"\u8BF7\u8F93\u5165\u5C97\u4F4D\u540D\u79F0",clearable:"",modelValue:l.form.postName,"onUpdate:modelValue":e[0]||(e[0]=c=>l.form.postName=c)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5C97\u4F4D\u7F16\u7801",prop:"postCode"},{default:s(()=>[t(f,{placeholder:"\u8BF7\u8F93\u5165\u5C97\u4F4D\u7F16\u7801",clearable:"",modelValue:l.form.postCode,"onUpdate:modelValue":e[1]||(e[1]=c=>l.form.postCode=c)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u72B6\u6001",prop:"enabled"},{default:s(()=>[t(y,{placeholder:"\u8BF7\u9009\u62E9\u542F\u7528\u72B6\u6001",clearable:"",modelValue:l.form.enabled,"onUpdate:modelValue":e[2]||(e[2]=c=>l.form.enabled=c)},{default:s(()=>[(u(!0),B(F,null,O(l.system_global_status,c=>(u(),g(p,{key:c.v,label:c.k,value:c.v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(d,null,{default:s(()=>[t(C,{type:"primary",onClick:n.handleSearch},{default:s(()=>[t(k,null,{default:s(()=>[t(w)]),_:1}),_(" \u641C\u7D22 ")]),_:1},8,["onClick"]),t(C,{onClick:n.handleReset},{default:s(()=>[t(k,null,{default:s(()=>[t(r)]),_:1}),_(" \u91CD\u7F6E ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"]),[[J,m.show]])]),_:1})}const ge=P(he,[["render",be]]),ye={props:["modelValue","type","ids"],emits:["update:modelValue","onSubmit"],data(){return{form:{postName:"",postCode:"",sort:1,enabled:1,remark:""},system_global_status:[],rules:{postName:[{required:!0,message:"\u5C97\u4F4D\u540D\u79F0\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{min:1,message:"\u5C97\u4F4D\u540D\u79F0\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}],postCode:[{required:!0,message:"\u5C97\u4F4D\u7F16\u7801\u4E3A\u5FC5\u586B\u9879",trigger:"blur"},{min:1,message:"\u5C97\u4F4D\u7F16\u7801\u4E3A\u5FC5\u586B\u9879",trigger:"blur"}],sort:[{required:!0,message:"",trigger:"blur"}]}}},computed:{show:{get(){return this.modelValue},set(o){this.$emit("update:modelValue",o)}},title(){return this.type===1?"\u65B0\u589E\u5C97\u4F4D":"\u4FEE\u6539\u5C97\u4F4D"}},methods:{...R(I,["resolveDictItemEnum"]),async init(){if(this.resolveDictItemEnum(["system_global_status"]).then(o=>{Object.assign(this,o),Object.assign(this.form,{enabled:o.system_global_status[0].v})}),this.type===2){const o=await ne({id:this.ids[0]});Object.assign(this.form,{...o,enabled:o.enabled.toString()})}},async invokeCreate(){const{postName:o,postCode:e,sort:m,enabled:i,remark:l}=this.form;await ae({postName:o,postCode:e,sort:m,enabled:i,remark:l}),x.success("\u521B\u5EFA\u5C97\u4F4D\u6210\u529F")},async invokeUpdate(o){const{postName:e,postCode:m,sort:i,enabled:l,remark:n}=this.form;await re({id:o,postName:e,postCode:m,sort:i,enabled:l,remark:n}),x.success("\u4FEE\u6539\u5C97\u4F4D\u6210\u529F")},async onSubmit(){try{const{formRef:e}=this.$refs;await e.validate()}catch{return}const{type:o}=this;if(o===1)await this.invokeCreate();else if(o===2)await this.invokeUpdate(this.ids[0]);else if(o===3)await Promise.all(this.ids.map(this.invokeUpdate));else return console.error("SystemPost->EditorDialog->onSubmit: \u672A\u77E5\u7684\u64CD\u4F5C\u7C7B\u578B "+o);this.onCancel(),this.$emit("onSubmit")},onCancel(){const{formRef:o}=this.$refs;this.show=!1,o.resetFields()},formatInputNumber:W},watch:{show:{immediate:!0,handler(o){o&&this.init()}}}},ke={class:"dialog-footer"};function Ce(o,e,m,i,l,n){const f=Y,d=q,p=ce,y=pe,w=G,k=U,C=ue;return u(),g(C,{modelValue:n.show,"onUpdate:modelValue":e[5]||(e[5]=r=>n.show=r),title:n.title,width:"600px","append-to-body":!0,"destroy-on-close":!0,"before-close":n.onCancel},{default:s(()=>[t(w,{ref:"formRef",model:l.form,rules:l.rules,"label-width":"90px",class:"form"},{default:s(()=>[t(d,{label:"\u5C97\u4F4D\u540D\u79F0",prop:"postName"},{default:s(()=>[t(f,{modelValue:l.form.postName,"onUpdate:modelValue":e[0]||(e[0]=r=>l.form.postName=r),placeholder:"\u8BF7\u8F93\u5165\u5C97\u4F4D\u540D\u79F0"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5C97\u4F4D\u7F16\u7801",prop:"postCode"},{default:s(()=>[t(f,{modelValue:l.form.postCode,"onUpdate:modelValue":e[1]||(e[1]=r=>l.form.postCode=r),placeholder:"\u8BF7\u8F93\u5165\u5C97\u4F4D\u7F16\u7801"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6392\u5E8F",prop:"sort"},{default:s(()=>[t(f,{modelValue:l.form.sort,"onUpdate:modelValue":e[2]||(e[2]=r=>l.form.sort=r),placeholder:"\u8BF7\u8F93\u5165\u6570\u5B57",oninput:n.formatInputNumber},null,8,["modelValue","oninput"])]),_:1}),t(d,{label:"\u72B6\u6001",prop:"enabled"},{default:s(()=>[t(y,{modelValue:l.form.enabled,"onUpdate:modelValue":e[3]||(e[3]=r=>l.form.enabled=r)},{default:s(()=>[(u(!0),B(F,null,O(l.system_global_status,r=>(u(),g(p,{key:r.v,label:r.v},{default:s(()=>[_(M(r.k),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(d,{label:"\u5907\u6CE8",prop:"remark"},{default:s(()=>[t(f,{modelValue:l.form.remark,"onUpdate:modelValue":e[4]||(e[4]=r=>l.form.remark=r),type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5C97\u4F4D\u5907\u6CE8",maxlength:200,"show-word-limit":""},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),footer:s(()=>[E("span",ke,[t(k,{onClick:n.onCancel},{default:s(()=>[_("\u53D6\u6D88")]),_:1},8,["onClick"]),t(k,{type:"primary",onClick:n.onSubmit},{default:s(()=>[_(" \u786E\u8BA4 ")]),_:1},8,["onClick"])])]),_:1},8,["modelValue","title","before-close"])}const Ee=P(ye,[["render",Ce]]),we={data(){return{showSearch:!0,editorBox:{show:!1,type:1,ids:[]},tableData:[],pageIndex:1,pageSize:10,count:2}},computed:{checkedAll:{get(){const o=this.tableData;return o.length===0?!1:o.every(e=>e.checked)},set(o){this.tableData.forEach(e=>e.checked=o)}},selectedRows(){return this.tableData.filter(o=>o.checked)},shouldDisabled(){return this.selectedRows.length===0}},methods:{...R(I,["resolveDictItemEnum"]),async init(){const o=await this.resolveDictItemEnum(["system_global_status"]),e=me(o.system_global_status),m=await ie({...this.searchQuery,current:this.pageIndex,size:this.pageSize});this.pageIndex=m.current,this.pageSize=m.size,this.count=m.total,this.tableData=m.records.map(i=>{const{createTime:l,updateTime:n}=i;return l&&(i.createTime=z("YYYY-MM-DD",l)),n&&(i.updateTime=z("YYYY-MM-DD",n)),i.checked=!1,i.enabled=e[i.enabled],i})},async onRemoveRow({id:o}){T.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u5C97\u4F4D\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>A({id:o})).then(()=>{x.success("\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},async onBatchRemoveRow(){T.confirm("\u60A8\u786E\u5B9A\u8981\u6279\u91CF\u5220\u9664\u9009\u4E2D\u7684\u5C97\u4F4D\u5417 ?","\u7CFB\u7EDF\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>Promise.all(this.selectedRows.map(({id:o})=>A({id:o})))).then(()=>{x.success("\u6279\u91CF\u5220\u9664\u6210\u529F"),this.init()}).catch(()=>null)},onSearch(o){this.searchQuery=o,this.init()},onEditorChange(o,e){o===2?e=[e]:o===3&&(e=this.selectedRows.map(m=>m.id)),this.editorBox.show=!0,this.editorBox.ids=e,this.editorBox.type=o},onPageChange(o,e){this.init()}},components:{Filters:ge,PostEditorDialog:Ee},created(){this.init()}},Ve={class:"SystemPost"},Se={class:"sys-table-action"},ve={class:"sys-table-main-actions"},xe={class:"sys-table-footer"},De=E("div",null,null,-1);function Re(o,e,m,i,l,n){const f=b("Filters"),d=b("Plus"),p=j,y=U,w=b("Delete"),k=b("Search"),C=le,r=b("RefreshRight"),v=_e,h=$,c=fe,L=b("EditPen"),N=se,Q=ee,K=Z,H=b("PostEditorDialog"),S=X("auth");return u(),B("div",Ve,[t(f,{show:l.showSearch,onOnSearch:n.onSearch},null,8,["show","onOnSearch"]),E("section",Se,[E("div",null,[V((u(),g(y,{type:"primary",onClick:e[0]||(e[0]=a=>n.onEditorChange(1))},{default:s(()=>[t(p,null,{default:s(()=>[t(d)]),_:1}),_(" \u65B0\u589E ")]),_:1})),[[S,"system:post:add"]]),V((u(),g(y,{type:"danger",disabled:n.shouldDisabled,onClick:n.onBatchRemoveRow},{default:s(()=>[t(p,null,{default:s(()=>[t(w)]),_:1}),_(" \u5220\u9664 ")]),_:1},8,["disabled","onClick"])),[[S,"system:post:delete"]])]),E("div",null,[t(C,{class:"box-item",effect:"dark",content:`${l.showSearch?"\u9690\u85CF":"\u663E\u793A"}\u641C\u7D22`,placement:"top"},{default:s(()=>[t(y,{circle:"",plain:"",onClick:e[1]||(e[1]=a=>l.showSearch=!l.showSearch)},{default:s(()=>[t(p,null,{default:s(()=>[t(k)]),_:1})]),_:1})]),_:1},8,["content"]),t(C,{class:"box-item",effect:"dark",content:"\u5237\u65B0\u8868\u683C",placement:"top"},{default:s(()=>[t(y,{circle:"",plain:"",onClick:n.init},{default:s(()=>[t(p,null,{default:s(()=>[t(r)]),_:1})]),_:1},8,["onClick"])]),_:1})])]),V((u(),g(Q,{data:l.tableData,stripe:"",border:""},{default:s(()=>[t(h,{width:"40"},{header:s(()=>[t(v,{modelValue:n.checkedAll,"onUpdate:modelValue":e[2]||(e[2]=a=>n.checkedAll=a)},null,8,["modelValue"])]),default:s(({row:a})=>[t(v,{modelValue:a.checked,"onUpdate:modelValue":D=>a.checked=D},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),t(h,{prop:"postName",label:"\u5C97\u4F4D\u540D\u79F0",align:"center"}),t(h,{prop:"postCode",label:"\u5C97\u4F4D\u7F16\u7801",align:"center"}),t(h,{prop:"sort",label:"\u5C97\u4F4D\u6392\u5E8F",align:"center"}),t(h,{prop:"enabled",label:"\u542F\u7528\u72B6\u6001",align:"center"},{default:s(({row:a})=>[t(c,null,{default:s(()=>[_(M(a.enabled),1)]),_:2},1024)]),_:1}),t(h,{prop:"createTime",label:"\u521B\u5EFA\u65F6\u95F4",align:"center"}),t(h,{label:"\u64CD\u4F5C",align:"center"},{default:s(({row:a})=>[E("div",ve,[V((u(),g(N,{type:"primary",underline:!1,onClick:D=>n.onEditorChange(2,a.id)},{default:s(()=>[t(p,null,{default:s(()=>[t(L)]),_:1}),_(" \u4FEE\u6539 ")]),_:2},1032,["onClick"])),[[S,"system:post:update"]]),V((u(),g(N,{type:"danger",underline:!1,style:{margin:"0 0 0 4px"},onClick:D=>n.onRemoveRow(a)},{default:s(()=>[t(p,null,{default:s(()=>[t(w)]),_:1}),_(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[S,"system:post:delete"]])])]),_:1})]),_:1},8,["data"])),[[S,"system:post:page"]]),E("div",xe,[De,t(K,{currentPage:l.pageIndex,"onUpdate:currentPage":e[3]||(e[3]=a=>l.pageIndex=a),"page-size":l.pageSize,"onUpdate:pageSize":e[4]||(e[4]=a=>l.pageSize=a),"page-sizes":[10,20,30,50],layout:"total, sizes, prev, pager, next, jumper",total:l.count,onSizeChange:e[5]||(e[5]=a=>n.onPageChange(l.pageIndex,a)),onCurrentChange:e[6]||(e[6]=a=>n.onPageChange(a,l.pageSize))},null,8,["currentPage","page-size","total"])]),t(H,{modelValue:l.editorBox.show,"onUpdate:modelValue":e[7]||(e[7]=a=>l.editorBox.show=a),type:l.editorBox.type,ids:l.editorBox.ids,onOnSubmit:n.init},null,8,["modelValue","type","ids","onOnSubmit"])])}const tt=P(we,[["render",Re]]);export{tt as default};
